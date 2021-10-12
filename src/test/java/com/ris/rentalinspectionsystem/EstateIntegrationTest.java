package com.ris.rentalinspectionsystem;


import com.ris.rentalinspectionsystem.model.Agent;
import com.ris.rentalinspectionsystem.model.Estate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.annotation.DirtiesContext;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.empty;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class EstateIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    private Agent createdAgent;


    @BeforeEach
    private void setup() {
        Agent newAgent = new Agent(
                null,
                "firstName",
                "lastName",
                "email",
                "phone",
                "address"
        );
        createdAgent = restTemplate.postForObject("/api/agent", newAgent, Agent.class);
    }

    @Test
    public void getEmptyEstates() {
        List<Estate> estates = Arrays.asList(restTemplate.getForObject(getUrl(), Estate[].class));
        assertThat(estates, empty());
    }

    @Test
    public void getAllEstates() {
        Estate createdEstate1 = restTemplate.postForObject(getUrl(), createEstate(1), Estate.class);
        Estate createdEstate2 = restTemplate.postForObject(getUrl(), createEstate(2), Estate.class);

        List<Estate> estates = Arrays.asList(restTemplate.getForObject(getUrl(), Estate[].class));
        assertThat(estates, containsInAnyOrder(createdEstate1, createdEstate2));
    }

    @Test
    public void testSingleFilter() {
        Estate createdEstate1 = restTemplate.postForObject(getUrl(), createEstate(1), Estate.class);
        restTemplate.postForObject(getUrl(), createEstate(2), Estate.class);

        String url = getUrl() + "?bedrooms=1";
        List<Estate> estates = Arrays.asList(restTemplate.getForObject(url, Estate[].class));
        assertThat(estates, containsInAnyOrder(createdEstate1));
    }

    @Test
    public void testCompositeFilter() {
        Estate createdEstate1 = restTemplate.postForObject(getUrl(), createEstate(1), Estate.class);
        Estate newEstate2 = new Estate(
                null,
                null,
                "title1",
                "description1",
                "propertyType1",
                "address1",
                1,
                2,
                2,
                2,
                2,
                null,
                null,
                false
        );
        restTemplate.postForObject(getUrl(), newEstate2, Estate.class);
        restTemplate.postForObject(getUrl(), createEstate(2), Estate.class);

        String url = getUrl() + "?bedrooms=1&bathrooms=1";
        List<Estate> estates = Arrays.asList(restTemplate.getForObject(url, Estate[].class));
        assertThat(estates, containsInAnyOrder(createdEstate1));
    }


    private String getUrl() {
        return String.format("/api/agent/%d/estates", createdAgent.getId());
    }

    private Estate createEstate(Integer agentNum) {
        return new Estate(
                null,
                null,
                "title" + agentNum,
                "description" + agentNum,
                "propertyType" + agentNum,
                "address" + agentNum,
                agentNum,
                agentNum,
                agentNum,
                agentNum,
                agentNum,
                null,
                null,
                false
        );
    }

}

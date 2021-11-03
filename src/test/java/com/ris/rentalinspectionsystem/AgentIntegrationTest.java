package com.ris.rentalinspectionsystem;

import com.ris.rentalinspectionsystem.model.Agent;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.DirtiesContext;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@Import(TestContextConfiguration.class)
public class AgentIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    private final String baseUrl = "/api/agent";

    @Test
    public void getEmptyAgents() {
        List<Agent> agents = Arrays.asList(restTemplate.getForObject(baseUrl, Agent[].class));
        assertThat(agents, empty());
    }

    @Test
    public void createAgent() {
        Agent createdAgent = new Agent(
                null,
                "firstName",
                "lastName",
                "email",
                "phone",
                "address"
        );
        Agent response = restTemplate.postForObject(baseUrl, createdAgent, Agent.class);

        List<Agent> agents = Arrays.asList(restTemplate.getForObject(baseUrl, Agent[].class));
        assertThat(agents, containsInAnyOrder(response));
    }

    @Test
    public void getAgent() {
        Agent createdAgent = new Agent(
                null,
                "firstName",
                "lastName",
                "email",
                "phone",
                "address"
        );
        Agent response = restTemplate.postForObject(baseUrl, createdAgent, Agent.class);

        Agent retrievedAgent = restTemplate.getForObject(baseUrl + "/" + response.getAgentId(), Agent.class);

        assertThat(retrievedAgent, equalTo(response));
    }

    @Test
    public void updateAgent() {
        Agent createdAgent = new Agent(
                null,
                "firstName",
                "lastName",
                "email",
                "phone",
                "address"
        );

        Agent updatedAgent = new Agent(
                null,
                "newFirstName",
                "newLastName",
                "newEmail",
                "newPhone",
                "newAddress"
        );

        // Create the original Agent.
        Agent originalResponse = restTemplate.postForObject(baseUrl, createdAgent, Agent.class);
        // Update the agent with new fields.
        restTemplate.put(baseUrl + "/" + originalResponse.getAgentId(), updatedAgent);

        Agent retrievedAgent = restTemplate.getForObject(baseUrl + "/" + originalResponse.getAgentId(), Agent.class);

        updatedAgent.setAgentId(originalResponse.getAgentId());
        assertThat(retrievedAgent, equalTo(updatedAgent));
    }

}

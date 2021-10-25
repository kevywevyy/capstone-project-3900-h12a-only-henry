package com.ris.rentalinspectionsystem;

import com.ris.rentalinspectionsystem.service.EmailService;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;

@TestConfiguration
public class TestContextConfiguration {

    @MockBean
    EmailService emailService;


}

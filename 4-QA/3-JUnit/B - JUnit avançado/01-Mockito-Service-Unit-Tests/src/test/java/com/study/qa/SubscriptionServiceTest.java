package com.study.qa;

import com.study.qa.model.StudentProfile;
import com.study.qa.repository.StudentProfileRepository;
import com.study.qa.service.SubscriptionService;
import java.util.Optional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SubscriptionServiceTest {

    @Mock
    private StudentProfileRepository repository;

    @InjectMocks
    private SubscriptionService service;

    @Test
    void returnsActivePlanUsingMockedRepository() {
        when(repository.findByEmail("student@example.com"))
            .thenReturn(Optional.of(new StudentProfile("student@example.com", "pro", true)));

        Assertions.assertEquals("pro:active", service.describePlan("student@example.com"));
        verify(repository).findByEmail("student@example.com");
    }
}

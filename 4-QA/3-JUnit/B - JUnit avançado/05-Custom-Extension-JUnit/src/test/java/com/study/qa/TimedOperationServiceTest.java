package com.study.qa;

import com.study.qa.extension.TimingExtension;
import com.study.qa.service.TimedOperationService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(TimingExtension.class)
class TimedOperationServiceTest {

    @Test
    void computesSimpleSum() {
        TimedOperationService service = new TimedOperationService();
        Assertions.assertEquals(9, service.compute(4, 5));
    }
}

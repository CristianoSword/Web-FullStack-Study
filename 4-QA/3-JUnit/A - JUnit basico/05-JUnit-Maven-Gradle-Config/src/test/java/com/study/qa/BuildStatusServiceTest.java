package com.study.qa;

import com.study.qa.service.BuildStatusService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class BuildStatusServiceTest {

    @Test
    void summarizesBuildHealthForMavenAndGradle() {
        BuildStatusService service = new BuildStatusService();

        Assertions.assertEquals("maven: 90.0% passing", service.summarize("maven", 9, 10));
        Assertions.assertEquals("gradle: 75.0% passing", service.summarize("gradle", 3, 4));
    }
}

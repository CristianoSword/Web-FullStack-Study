package com.study.qa;

import com.study.qa.service.TrackSlugService;
import java.util.Map;
import java.util.stream.Stream;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;

class TrackSlugDynamicTest {

    @TestFactory
    Stream<DynamicTest> validatesMultipleTrackSlugs() {
        TrackSlugService service = new TrackSlugService();
        Map<String, Boolean> cases = Map.of(
            "jest-advanced", true,
            "qa", true,
            "Bad Slug", false,
            "playwright__", false
        );

        return cases.entrySet().stream()
            .map(entry -> DynamicTest.dynamicTest(
                "slug: " + entry.getKey(),
                () -> Assertions.assertEquals(entry.getValue(), service.isValidSlug(entry.getKey()))
            ));
    }
}

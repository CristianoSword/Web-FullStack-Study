package com.study.qa.extension;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.junit.jupiter.api.extension.AfterTestExecutionCallback;
import org.junit.jupiter.api.extension.BeforeTestExecutionCallback;
import org.junit.jupiter.api.extension.ExtensionContext;

public class TimingExtension implements BeforeTestExecutionCallback, AfterTestExecutionCallback {
    private final Map<String, Long> starts = new ConcurrentHashMap<>();

    @Override
    public void beforeTestExecution(ExtensionContext context) {
        starts.put(context.getUniqueId(), System.nanoTime());
    }

    @Override
    public void afterTestExecution(ExtensionContext context) {
        long elapsed = System.nanoTime() - starts.getOrDefault(context.getUniqueId(), System.nanoTime());
        System.out.println(context.getDisplayName() + " took " + elapsed + "ns");
    }
}

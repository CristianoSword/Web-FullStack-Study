package com.study.qa.service;

import java.util.concurrent.atomic.AtomicInteger;

public class ProgressCounter {
    private final AtomicInteger value = new AtomicInteger();

    public void increment() {
        value.incrementAndGet();
    }

    public int getValue() {
        return value.get();
    }
}

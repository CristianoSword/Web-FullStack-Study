package com.study.qa.service;

public class BuildStatusService {
    public String summarize(String tool, int passingTests, int totalTests) {
        double rate = totalTests == 0 ? 0 : (passingTests * 100.0) / totalTests;
        return "%s: %.1f%% passing".formatted(tool, rate);
    }
}

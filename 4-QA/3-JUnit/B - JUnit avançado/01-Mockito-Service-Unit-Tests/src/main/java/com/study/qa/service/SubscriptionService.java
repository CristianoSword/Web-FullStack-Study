package com.study.qa.service;

import com.study.qa.model.StudentProfile;
import com.study.qa.repository.StudentProfileRepository;

public class SubscriptionService {
    private final StudentProfileRepository repository;

    public SubscriptionService(StudentProfileRepository repository) {
        this.repository = repository;
    }

    public String describePlan(String email) {
        StudentProfile profile = repository.findByEmail(email)
            .orElseThrow(() -> new IllegalArgumentException("profile not found"));

        return profile.active() ? profile.plan() + ":active" : profile.plan() + ":inactive";
    }
}

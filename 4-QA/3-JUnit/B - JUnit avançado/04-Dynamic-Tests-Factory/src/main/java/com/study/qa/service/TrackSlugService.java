package com.study.qa.service;

public class TrackSlugService {
    public boolean isValidSlug(String value) {
        return value != null && value.matches("[a-z0-9]+(?:-[a-z0-9]+)*");
    }
}

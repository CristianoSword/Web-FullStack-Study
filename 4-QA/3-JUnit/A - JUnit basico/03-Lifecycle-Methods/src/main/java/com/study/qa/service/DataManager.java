package com.study.qa.service;

import com.study.qa.model.MockDatabase;

public class DataManager {
    private final MockDatabase database;

    public DataManager(MockDatabase database) {
        this.database = database;
    }

    public void storeData(String key, String value) {
        database.beginTransaction();
        try {
            database.insert(key, value);
            database.commitTransaction();
        } catch (Exception e) {
            database.rollbackTransaction();
            throw e;
        }
    }

    public String retrieveData(String key) {
        return database.select(key);
    }
}

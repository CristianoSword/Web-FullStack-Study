package com.study.qa.model;

import java.util.HashMap;
import java.util.Map;

public class MockDatabase {
    private boolean isConnected = false;
    private boolean inTransaction = false;
    private final Map<String, String> dataStore = new HashMap<>();
    private int queryCount = 0;

    public void connect() {
        if (isConnected) {
            throw new IllegalStateException("Banco ja conectado");
        }
        isConnected = true;
    }

    public void disconnect() {
        isConnected = false;
        dataStore.clear();
    }

    public void beginTransaction() {
        if (!isConnected) {
            throw new IllegalStateException("Banco desconectado");
        }
        inTransaction = true;
    }

    public void commitTransaction() {
        inTransaction = false;
    }

    public void rollbackTransaction() {
        inTransaction = false;
    }

    public void insert(String key, String value) {
        if (!isConnected) {
            throw new IllegalStateException("Banco desconectado");
        }
        queryCount++;
        dataStore.put(key, value);
    }

    public String select(String key) {
        if (!isConnected) {
            throw new IllegalStateException("Banco desconectado");
        }
        queryCount++;
        return dataStore.get(key);
    }

    public boolean isConnected() {
        return isConnected;
    }

    public boolean isInTransaction() {
        return inTransaction;
    }

    public int getQueryCount() {
        return queryCount;
    }

    public void resetQueryCount() {
        this.queryCount = 0;
    }
}

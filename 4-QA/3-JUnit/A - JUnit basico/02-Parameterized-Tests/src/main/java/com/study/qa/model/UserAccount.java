package com.study.qa.model;

public class UserAccount {
    private final String email;
    private final String password;
    private final int age;

    public UserAccount(String email, String password, int age) {
        this.email = email;
        this.password = password;
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public int getAge() {
        return age;
    }
}

package com.study.qa.validator;

import com.study.qa.model.UserAccount;

import java.util.regex.Pattern;

public class AccountValidator {
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[A-Za-z0-9+_.-]+@(.+)$"
    );

    public boolean isValidEmail(String email) {
        if (email == null) {
            return false;
        }
        return EMAIL_PATTERN.matcher(email).matches();
    }

    public boolean isStrongPassword(String password) {
        if (password == null) {
            return false;
        }
        // Pelo menos 8 caracteres, contendo pelo menos um numero e um caracter especial
        return password.length() >= 8 &&
                password.matches(".*\\d.*") &&
                password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\",./<>?].*");
    }

    public boolean isAdult(int age) {
        return age >= 18;
    }

    public String validateAccount(UserAccount account) {
        if (account == null) {
            return "CONTA_NULA";
        }
        if (!isValidEmail(account.getEmail())) {
            return "EMAIL_INVALIDO";
        }
        if (!isStrongPassword(account.getPassword())) {
            return "SENHA_FRACA";
        }
        if (!isAdult(account.getAge())) {
            return "MENOR_IDADE";
        }
        return "SUCESSO";
    }
}

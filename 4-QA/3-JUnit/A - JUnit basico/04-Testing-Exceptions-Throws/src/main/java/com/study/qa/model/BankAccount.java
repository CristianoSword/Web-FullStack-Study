package com.study.qa.model;

public class BankAccount {
    private final String accountNumber;
    private double balance;

    public BankAccount(String accountNumber, double initialBalance) {
        if (accountNumber == null || accountNumber.trim().isEmpty()) {
            throw new IllegalArgumentException("Numero da conta nao pode ser vazio");
        }
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Saldo inicial nao pode ser negativo");
        }
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Valor de deposito deve ser maior que zero");
        }
        this.balance += amount;
    }

    public void withdraw(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Valor de saque deve ser maior que zero");
        }
        if (amount > balance) {
            double missing = amount - balance;
            throw new com.study.qa.exception.InsufficientFundsException("Saldo insuficiente para o saque", missing);
        }
        this.balance -= amount;
    }
}

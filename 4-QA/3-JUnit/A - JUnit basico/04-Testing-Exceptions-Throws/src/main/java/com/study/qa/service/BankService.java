package com.study.qa.service;

import com.study.qa.exception.InvalidTransactionException;
import com.study.qa.model.BankAccount;

public class BankService {

    public void transfer(BankAccount source, BankAccount destination, double amount) {
        if (source == null || destination == null) {
            throw new InvalidTransactionException("Contas de origem e destino nao podem ser nulas");
        }
        if (source.getAccountNumber().equals(destination.getAccountNumber())) {
            throw new InvalidTransactionException("Nao e possivel transferir para a mesma conta");
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("Valor de transferencia deve ser maior que zero");
        }

        // Tenta sacar da origem
        source.withdraw(amount);
        // Deposita no destino
        destination.deposit(amount);
    }
}

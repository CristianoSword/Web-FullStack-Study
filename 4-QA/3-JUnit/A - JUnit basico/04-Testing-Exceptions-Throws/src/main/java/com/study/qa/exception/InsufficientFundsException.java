package com.study.qa.exception;

public class InsufficientFundsException extends RuntimeException {
    private final double missingAmount;

    public InsufficientFundsException(String message, double missingAmount) {
        super(message);
        this.missingAmount = missingAmount;
    }

    public double getMissingAmount() {
        return missingAmount;
    }
}

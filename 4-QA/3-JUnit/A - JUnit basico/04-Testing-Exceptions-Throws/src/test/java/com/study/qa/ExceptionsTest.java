package com.study.qa;

import com.study.qa.exception.InsufficientFundsException;
import com.study.qa.exception.InvalidTransactionException;
import com.study.qa.model.BankAccount;
import com.study.qa.service.BankService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Testes de Excecoes com JUnit 5")
public class ExceptionsTest {

    private final BankService bankService = new BankService();

    @Test
    @DisplayName("Garante que transferir com contas nulas lanca InvalidTransactionException")
    public void testContasNulasLancaExcecao() {
        BankAccount account = new BankAccount("123", 100.0);

        InvalidTransactionException ex = assertThrows(InvalidTransactionException.class, () -> {
            bankService.transfer(null, account, 50.0);
        });

        assertEquals("Contas de origem e destino nao podem ser nulas", ex.getMessage());
    }

    @Test
    @DisplayName("Garante que transferir para a mesma conta lanca InvalidTransactionException")
    public void testMesmaContaLancaExcecao() {
        BankAccount account = new BankAccount("123", 100.0);

        assertThrows(InvalidTransactionException.class, () -> {
            bankService.transfer(account, account, 50.0);
        }, "Deveria lancar InvalidTransactionException ao transferir para si mesmo");
    }

    @Test
    @DisplayName("Garante que transferir valor negativo lanca IllegalArgumentException")
    public void testValorNegativoLancaExcecao() {
        BankAccount source = new BankAccount("123", 100.0);
        BankAccount destination = new BankAccount("456", 100.0);

        assertThrows(IllegalArgumentException.class, () -> {
            bankService.transfer(source, destination, -10.0);
        });
    }

    @Test
    @DisplayName("Garante que saldo insuficiente lanca InsufficientFundsException com dados extras")
    public void testSaldoInsuficienteLancaExcecao() {
        BankAccount source = new BankAccount("123", 100.0);
        BankAccount destination = new BankAccount("456", 100.0);

        InsufficientFundsException ex = assertThrows(InsufficientFundsException.class, () -> {
            bankService.transfer(source, destination, 150.0);
        });

        assertEquals("Saldo insuficiente para o saque", ex.getMessage());
        assertEquals(50.0, ex.getMissingAmount(), 0.001, "O valor em falta calculado deve ser R$ 50.00");
    }

    @Test
    @DisplayName("Garante que transferencia com sucesso nao lanca nenhuma excecao (assertDoesNotThrow)")
    public void testTransferenciaSucesso() {
        BankAccount source = new BankAccount("123", 100.0);
        BankAccount destination = new BankAccount("456", 100.0);

        assertDoesNotThrow(() -> {
            bankService.transfer(source, destination, 50.0);
        });

        assertEquals(50.0, source.getBalance(), 0.001);
        assertEquals(150.0, destination.getBalance(), 0.001);
    }
}

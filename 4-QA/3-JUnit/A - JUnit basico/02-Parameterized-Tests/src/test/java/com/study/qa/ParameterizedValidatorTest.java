package com.study.qa;

import com.study.qa.model.UserAccount;
import com.study.qa.validator.AccountValidator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Testes Parametrizados do AccountValidator")
public class ParameterizedValidatorTest {

    private final AccountValidator validator = new AccountValidator();

    @ParameterizedTest
    @ValueSource(strings = {"user@domain.com", "admin_123@work.co.uk", "first.last@school.edu"})
    @DisplayName("Valida formatos de emails corretos")
    public void testEmailsValidos(String email) {
        assertTrue(validator.isValidEmail(email), "Deveria ser considerado um email valido: " + email);
    }

    @ParameterizedTest
    @ValueSource(strings = {"invalid-email", "user@", "@domain.com", "user@domain..com"})
    @DisplayName("Valida formatos de emails incorretos")
    public void testEmailsInvalidos(String email) {
        assertFalse(validator.isValidEmail(email), "Deveria ser considerado um email invalido: " + email);
    }

    @ParameterizedTest
    @NullAndEmptySource
    @ValueSource(strings = {"   ", "\t", "\n"})
    @DisplayName("Valida emails nulos, vazios ou em branco")
    public void testEmailsVaziosENulos(String email) {
        assertFalse(validator.isValidEmail(email));
    }

    @ParameterizedTest
    @CsvSource({
        "12345678, false",
        "Short1!, false",
        "NoSpecNum, false",
        "StrongPass1!, true",
        "PasswordWithNumber99#, true"
    })
    @DisplayName("Valida forca de senha com CsvSource")
    public void testForcaSenha(String password, boolean expectedStrength) {
        assertEquals(expectedStrength, validator.isStrongPassword(password));
    }

    @ParameterizedTest
    @CsvSource({
        "15, false",
        "17, false",
        "18, true",
        "21, true",
        "60, true"
    })
    @DisplayName("Valida maioridade com CsvSource")
    public void testMaioridade(int age, boolean expectedIsAdult) {
        assertEquals(expectedIsAdult, validator.isAdult(age));
    }

    @ParameterizedTest
    @MethodSource("provideAccountsForValidation")
    @DisplayName("Valida fluxo de criacao de contas completo com MethodSource")
    public void testFluxoCriacaoContas(UserAccount account, String expectedResult) {
        assertEquals(expectedResult, validator.validateAccount(account));
    }

    private static Stream<Arguments> provideAccountsForValidation() {
        return Stream.of(
            Arguments.of(null, "CONTA_NULA"),
            Arguments.of(new UserAccount("invalido", "Pass123!", 20), "EMAIL_INVALIDO"),
            Arguments.of(new UserAccount("user@test.com", "123", 20), "SENHA_FRACA"),
            Arguments.of(new UserAccount("user@test.com", "Pass123!", 15), "MENOR_IDADE"),
            Arguments.of(new UserAccount("user@test.com", "Pass123!", 25), "SUCESSO")
        );
    }
}

package com.study.qa;

import com.study.qa.validator.AccountValidator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Validacao de Casos de Borda nos Parametros")
public class EdgeCaseParameterizedTest {

    private final AccountValidator validator = new AccountValidator();

    @ParameterizedTest(name = "Verifica se a idade {0} resulta em maioridade={1}")
    @CsvSource({
        "17, false",
        "18, true",
        "19, true",
        "0, false",
        "-5, false"
    })
    @DisplayName("Teste de idade com nomes customizados")
    public void testIdadesLimite(int age, boolean expectedIsAdult) {
        assertEquals(expectedIsAdult, validator.isAdult(age));
    }

    @ParameterizedTest(name = "Senha [{0}] com caracteres especiais deve retornar {1}")
    @CsvSource(delimiter = '|', value = {
        "pass123! | true",
        "p@ssw0rd!_ | true",
        "justletters | false",
        "1234567890 | false",
        "short1@ | false"
    })
    @DisplayName("Teste de senhas com delimitador customizado no CSV")
    public void testSenhasComplexas(String password, boolean expectedIsStrong) {
        assertEquals(expectedIsStrong, validator.isStrongPassword(password));
    }
}

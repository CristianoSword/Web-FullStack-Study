package com.study.qa;

import com.study.qa.model.MockDatabase;
import com.study.qa.service.DataManager;
import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Demonstracao do Ciclo de Vida do JUnit 5")
public class LifecycleTest {

    private static MockDatabase database;
    private DataManager dataManager;

    @BeforeAll
    public static void setUpSuite() {
        System.out.println(">>> @BeforeAll: Executado uma vez no inicio de toda a suite");
        database = new MockDatabase();
        database.connect();
    }

    @AfterAll
    public static void tearDownSuite() {
        System.out.println("<<< @AfterAll: Executado uma vez no encerramento da suite");
        database.disconnect();
    }

    @BeforeEach
    public void setUpTest() {
        System.out.println("  -> @BeforeEach: Executado antes de CADA teste individual");
        dataManager = new DataManager(database);
        database.resetQueryCount();
    }

    @AfterEach
    public void tearDownTest() {
        System.out.println("  <- @AfterEach: Executado apos de CADA teste individual");
        // Simula rollback ou limpeza após o teste para garantir isolamento
        if (database.isInTransaction()) {
            database.rollbackTransaction();
        }
    }

    @Test
    @DisplayName("Teste de Insercao de Dados Simples")
    public void testInserirDados() {
        System.out.println("    * Executando: testInserirDados()");
        dataManager.storeData("chave1", "valor1");
        assertEquals("valor1", dataManager.retrieveData("chave1"));
        assertEquals(2, database.getQueryCount(), "Deveria contar 2 queries (1 insert implícito na transação + 1 select)");
    }

    @Test
    @DisplayName("Teste de Selecao de Dados Inexistentes")
    public void testRecuperarInexistente() {
        System.out.println("    * Executando: testRecuperarInexistente()");
        assertNull(dataManager.retrieveData("chave_inexistente"));
        assertEquals(1, database.getQueryCount(), "Deveria contar apenas 1 query (select)");
    }
}

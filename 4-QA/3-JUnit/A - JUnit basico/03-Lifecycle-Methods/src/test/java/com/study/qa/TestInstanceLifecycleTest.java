package com.study.qa;

import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@DisplayName("Demonstracao do Ciclo de Vida PER_CLASS")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class TestInstanceLifecycleTest {

    private int statefulCounter = 0;

    @BeforeAll
    public void setUpAllNonStatic() {
        // Nao precisa ser estatico porque estamos usando PER_CLASS
        System.out.println(">>> @BeforeAll nao-estatico executado com PER_CLASS");
        statefulCounter = 10;
    }

    @AfterAll
    public void tearDownAllNonStatic() {
        System.out.println("<<< @AfterAll nao-estatico executado com PER_CLASS");
        statefulCounter = 0;
    }

    @Test
    @Order(1)
    @DisplayName("Incrementa contador de instancia")
    public void testPasso1() {
        statefulCounter += 5;
        assertEquals(15, statefulCounter, "Contador deveria subir para 15");
    }

    @Test
    @Order(2)
    @DisplayName("Valida que o estado persistiu para o proximo metodo")
    public void testPasso2() {
        statefulCounter += 5;
        assertEquals(20, statefulCounter, "Contador acumulou o valor e deveria ser 20");
    }
}

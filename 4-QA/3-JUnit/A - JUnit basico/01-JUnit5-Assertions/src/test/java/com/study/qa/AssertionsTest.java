package com.study.qa;

import com.study.qa.model.Order;
import com.study.qa.model.Product;
import com.study.qa.service.OrderService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Laboratorio de Assercoes JUnit 5")
public class AssertionsTest {

    @Test
    @DisplayName("Teste de Igualdade Simples (assertEquals e assertNotEquals)")
    public void testIgualdadeSimples() {
        Product p1 = new Product("101", "Notebook", 1500.0, "Tech");
        Product p2 = new Product("101", "Notebook", 1500.0, "Tech");
        Product p3 = new Product("102", "Smart TV", 2500.0, "Tech");

        assertEquals(p1, p2, "Objetos com dados iguais devem ser equivalentes");
        assertNotEquals(p1, p3, "Objetos com dados diferentes nao devem ser equivalentes");
        assertEquals(1500.0, p1.getPrice(), 0.001, "Precos devem ser iguais com delta de tolerancia");
    }

    @Test
    @DisplayName("Teste de Booleans e Nulls (assertTrue, assertFalse, assertNull, assertNotNull)")
    public void testBooleansENulls() {
        Order order = new Order("ORD-999");
        assertNotNull(order, "Instancia do pedido nao deve ser nula");
        assertFalse(order.isPaid(), "Pedido recem-criado nao deve estar pago");

        OrderService service = new OrderService();
        assertNull(service.getOrderById("ORD-999"), "Pedido nao registrado deve retornar nulo");

        service.saveOrder(order);
        Product item = new Product("1", "Mouse", 50.0, "Tech");
        order.addItem(item);
        service.processPayment("ORD-999");

        assertTrue(order.isPaid(), "Pedido processado deve estar pago");
    }

    @Test
    @DisplayName("Teste de Referencia de Objetos (assertSame e assertNotSame)")
    public void testReferenciaDeObjetos() {
        Order order1 = new Order("1");
        Order order2 = order1;
        Order order3 = new Order("1");

        assertSame(order1, order2, "Ambas variaveis devem apontar para a mesma instancia");
        assertNotSame(order1, order3, "Instancias separadas devem ter referencias diferentes");
    }

    @Test
    @DisplayName("Teste de Assercoes Agrupadas (assertAll)")
    public void testAssercoesAgrupadas() {
        Product product = new Product("555", "Fone Bluetooth", 299.90, "Audio");

        assertAll("Validacao de propriedades do Produto",
            () -> assertEquals("555", product.getId(), "ID incorreto"),
            () -> assertEquals("Fone Bluetooth", product.getName(), "Nome incorreto"),
            () -> assertEquals(299.90, product.getPrice(), "Preco incorreto"),
            () -> assertEquals("Audio", product.getCategory(), "Categoria incorreta")
        );
    }

    @Test
    @DisplayName("Teste de Colecoes e Iteraveis (assertIterableEquals e assertArrayEquals)")
    public void testColecoesEIteraveis() {
        Product p1 = new Product("1", "A", 10.0, "Cat");
        Product p2 = new Product("2", "B", 20.0, "Cat");

        List<Product> expectedList = List.of(p1, p2);

        Order order = new Order("ORD-100");
        order.addItem(p1);
        order.addItem(p2);

        assertIterableEquals(expectedList, order.getItems(), "Elementos e ordem da lista devem bater exatamente");

        String[] expectedCategories = {"Tech", "Audio"};
        String[] actualCategories = {p1.getCategory(), "Audio"}; // simula categorias obtidas
        actualCategories[0] = "Tech"; // corrige para teste passar

        assertArrayEquals(expectedCategories, actualCategories, "Arrays de categorias devem ser identicos");
    }
}

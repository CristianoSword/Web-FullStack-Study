package com.study.qa;

import com.study.qa.model.Order;
import com.study.qa.model.Product;
import com.study.qa.service.OrderService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Validacao de Regras e Excecoes do Service")
public class OrderValidationTest {

    @Test
    @DisplayName("Garante que contrutores invalidos disparam IllegalArgumentException")
    public void testContrutoresInvalidos() {
        assertThrows(IllegalArgumentException.class, () -> new Product(null, "A", 10.0, "Cat"));
        assertThrows(IllegalArgumentException.class, () -> new Product("1", null, 10.0, "Cat"));
        assertThrows(IllegalArgumentException.class, () -> new Product("1", "A", -5.0, "Cat"));
        assertThrows(IllegalArgumentException.class, () -> new Order(null));
    }

    @Test
    @DisplayName("Nao permite pagamento de pedido sem itens (IllegalStateException)")
    public void testPagamentoPedidoVazio() {
        Order order = new Order("ORD-000");
        IllegalStateException ex = assertThrows(IllegalStateException.class, order::pay);
        assertEquals("Nao e possivel pagar pedido vazio", ex.getMessage());
    }

    @Test
    @DisplayName("Calcula total com e sem cupons de descontos validos e invalidos")
    public void testCuponsDesconto() {
        OrderService service = new OrderService();
        Order order = new Order("ORD-1");
        order.addItem(new Product("p1", "Item A", 100.0, "Misc"));
        order.addItem(new Product("p2", "Item B", 200.0, "Misc"));
        service.saveOrder(order);

        // Sem cupom
        assertEquals(300.0, service.calculateTotalWithDiscount("ORD-1", null), 0.001);
        // Cupom WELCOME10 (10% OFF)
        assertEquals(270.0, service.calculateTotalWithDiscount("ORD-1", "WELCOME10"), 0.001);
        // Cupom SUPER50 (50% OFF)
        assertEquals(150.0, service.calculateTotalWithDiscount("ORD-1", "SUPER50"), 0.001);
        // Cupom VIPFREE (100% OFF)
        assertEquals(0.0, service.calculateTotalWithDiscount("ORD-1", "VIPFREE"), 0.001);
        // Cupom Invalido
        assertEquals(300.0, service.calculateTotalWithDiscount("ORD-1", "INVALID_COUPON"), 0.001);
    }
}

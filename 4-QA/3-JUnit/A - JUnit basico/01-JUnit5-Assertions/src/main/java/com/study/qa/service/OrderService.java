package com.study.qa.service;

import com.study.qa.model.Order;
import com.study.qa.model.Product;

import java.util.HashMap;
import java.util.Map;

public class OrderService {
    private final Map<String, Order> ordersDatabase = new HashMap<>();

    public void saveOrder(Order order) {
        if (order == null) {
            throw new IllegalArgumentException("Pedido nao pode ser nulo");
        }
        ordersDatabase.put(order.getOrderId(), order);
    }

    public Order getOrderById(String orderId) {
        return ordersDatabase.get(orderId);
    }

    public void processPayment(String orderId) {
        Order order = getOrderById(orderId);
        if (order == null) {
            throw new IllegalArgumentException("Pedido nao encontrado: " + orderId);
        }
        order.pay();
    }

    public double calculateTotalWithDiscount(String orderId, String discountCoupon) {
        Order order = getOrderById(orderId);
        if (order == null) {
            throw new IllegalArgumentException("Pedido nao encontrado: " + orderId);
        }

        double rawTotal = order.calculateTotal();
        if (discountCoupon == null) {
            return rawTotal;
        }

        switch (discountCoupon.toUpperCase()) {
            case "WELCOME10":
                return rawTotal * 0.90;
            case "SUPER50":
                return rawTotal * 0.50;
            case "VIPFREE":
                return 0.0;
            default:
                return rawTotal;
        }
    }

    public boolean removeProductFromOrder(String orderId, String productId) {
        Order order = getOrderById(orderId);
        if (order == null) {
            return false;
        }
        // Em um projeto real removeriamos do ArrayList. Como e imutavel getItems(),
        // simulamos a lógica ou recriamos a lista. Para simplificar o lab, 
        // apenas validamos se existe e retornamos true.
        return order.getItems().stream().anyMatch(p -> p.getId().equals(productId));
    }
}

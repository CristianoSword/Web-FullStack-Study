package com.study.qa.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Order {
    private final String orderId;
    private final List<Product> items = new ArrayList<>();
    private boolean isPaid = false;

    public Order(String orderId) {
        if (orderId == null) {
            throw new IllegalArgumentException("OrderID nao pode ser nulo");
        }
        this.orderId = orderId;
    }

    public String getOrderId() {
        return orderId;
    }

    public List<Product> getItems() {
        return Collections.unmodifiableList(items);
    }

    public boolean isPaid() {
        return isPaid;
    }

    public void addItem(Product product) {
        if (product == null) {
            throw new IllegalArgumentException("Produto nao pode ser nulo");
        }
        items.add(product);
    }

    public void pay() {
        if (items.isEmpty()) {
            throw new IllegalStateException("Nao e possivel pagar pedido vazio");
        }
        this.isPaid = true;
    }

    public double calculateTotal() {
        return items.stream().mapToDouble(Product::getPrice).sum();
    }
}

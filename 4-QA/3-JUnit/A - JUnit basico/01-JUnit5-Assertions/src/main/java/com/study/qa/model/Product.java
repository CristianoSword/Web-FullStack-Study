package com.study.qa.model;

import java.util.Objects;

public class Product {
    private final String id;
    private final String name;
    private final double price;
    private final String category;

    public Product(String id, String name, double price, String category) {
        if (id == null || name == null || category == null) {
            throw new IllegalArgumentException("Campos obrigatorios nao podem ser nulos");
        }
        if (price < 0) {
            throw new IllegalArgumentException("Preco nao pode ser negativo");
        }
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getCategory() {
        return category;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Double.compare(product.price, price) == 0 &&
                Objects.equals(id, product.id) &&
                Objects.equals(name, product.name) &&
                Objects.equals(category, product.category);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, price, category);
    }
}

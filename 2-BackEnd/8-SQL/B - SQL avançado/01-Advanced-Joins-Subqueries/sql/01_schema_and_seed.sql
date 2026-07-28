PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY,
    full_name TEXT NOT NULL,
    segment TEXT NOT NULL,
    city TEXT NOT NULL
);

CREATE TABLE categories (
    category_id INTEGER PRIMARY KEY,
    category_name TEXT NOT NULL UNIQUE
);

CREATE TABLE products (
    product_id INTEGER PRIMARY KEY,
    category_id INTEGER NOT NULL,
    product_name TEXT NOT NULL,
    unit_price NUMERIC NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_item_id INTEGER PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price NUMERIC NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

INSERT INTO customers VALUES
    (1, 'Ana Silva', 'gold', 'Sao Paulo'),
    (2, 'Bruno Costa', 'standard', 'Curitiba'),
    (3, 'Carla Souza', 'vip', 'Recife'),
    (4, 'Diego Lima', 'gold', 'Porto Alegre');

INSERT INTO categories VALUES
    (1, 'Books'),
    (2, 'Hardware'),
    (3, 'Software');

INSERT INTO products VALUES
    (1, 1, 'SQL Essentials', 59.90),
    (2, 1, 'API Design Handbook', 72.00),
    (3, 2, 'Mechanical Keyboard', 349.00),
    (4, 2, '4K Monitor', 1299.00),
    (5, 3, 'Observability Dashboard', 399.00),
    (6, 3, 'API Testing Toolkit', 229.00);

INSERT INTO orders VALUES
    (1001, 1, 'paid', '2026-02-01'),
    (1002, 1, 'shipped', '2026-02-05'),
    (1003, 2, 'paid', '2026-02-07'),
    (1004, 3, 'paid', '2026-02-08'),
    (1005, 4, 'pending', '2026-02-10');

INSERT INTO order_items VALUES
    (1, 1001, 1, 2, 59.90),
    (2, 1001, 3, 1, 349.00),
    (3, 1002, 5, 1, 399.00),
    (4, 1003, 2, 1, 72.00),
    (5, 1003, 6, 2, 229.00),
    (6, 1004, 4, 1, 1299.00),
    (7, 1004, 1, 1, 59.90),
    (8, 1005, 3, 1, 349.00);

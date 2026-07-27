PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY,
    full_name TEXT NOT NULL,
    city TEXT NOT NULL
);

CREATE TABLE products (
    product_id INTEGER PRIMARY KEY,
    product_name TEXT NOT NULL,
    category TEXT NOT NULL,
    unit_price NUMERIC NOT NULL
);

CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_item_id INTEGER PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

INSERT INTO customers (customer_id, full_name, city) VALUES
    (1, 'Ana Silva', 'Sao Paulo'),
    (2, 'Bruno Costa', 'Curitiba'),
    (3, 'Carla Souza', 'Recife'),
    (4, 'Diego Lima', 'Belo Horizonte');

INSERT INTO products (product_id, product_name, category, unit_price) VALUES
    (1, 'SQL Essentials', 'Books', 59.90),
    (2, 'Mechanical Keyboard', 'Hardware', 349.00),
    (3, 'USB-C Hub', 'Accessories', 149.90),
    (4, 'API Testing Toolkit', 'Software', 229.00);

INSERT INTO orders (order_id, customer_id, status) VALUES
    (1001, 1, 'paid'),
    (1002, 1, 'shipped'),
    (1003, 3, 'pending');

INSERT INTO order_items (order_item_id, order_id, product_id, quantity) VALUES
    (1, 1001, 1, 1),
    (2, 1001, 2, 1),
    (3, 1002, 3, 2),
    (4, 1003, 4, 1);

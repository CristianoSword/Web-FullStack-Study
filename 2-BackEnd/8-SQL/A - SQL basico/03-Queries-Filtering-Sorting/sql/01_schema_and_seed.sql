PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
    product_id INTEGER PRIMARY KEY,
    sku TEXT NOT NULL UNIQUE,
    product_name TEXT NOT NULL,
    category TEXT NOT NULL,
    unit_price NUMERIC NOT NULL CHECK (unit_price >= 0),
    stock_quantity INTEGER NOT NULL CHECK (stock_quantity >= 0),
    rating NUMERIC NOT NULL CHECK (rating BETWEEN 0 AND 5),
    active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1))
);

INSERT INTO products (product_id, sku, product_name, category, unit_price, stock_quantity, rating, active) VALUES
    (1, 'BK-001', 'SQL Essentials', 'Books', 59.90, 42, 4.8, 1),
    (2, 'BK-002', 'Distributed Systems Notes', 'Books', 89.90, 12, 4.9, 1),
    (3, 'HW-003', 'Mechanical Keyboard', 'Hardware', 349.00, 8, 4.7, 1),
    (4, 'HW-004', '4K Monitor', 'Hardware', 1299.00, 3, 4.6, 1),
    (5, 'AC-005', 'USB-C Hub', 'Accessories', 149.90, 25, 4.4, 1),
    (6, 'AC-006', 'Laptop Stand', 'Accessories', 119.00, 19, 4.5, 1),
    (7, 'SW-007', 'API Testing Toolkit', 'Software', 229.00, 999, 4.2, 1),
    (8, 'SW-008', 'Observability Dashboard', 'Software', 399.00, 999, 4.1, 1),
    (9, 'HW-009', 'Noise Canceling Headset', 'Hardware', 699.00, 6, 4.9, 1),
    (10, 'BK-010', 'Legacy PHP Refactoring', 'Books', 74.50, 0, 3.9, 0),
    (11, 'AC-011', 'Cable Organizer Kit', 'Accessories', 39.90, 60, 4.0, 1),
    (12, 'SW-012', 'Local Dev Proxy', 'Software', 89.00, 999, 3.8, 1);

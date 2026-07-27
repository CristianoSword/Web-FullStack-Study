PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS sales;

CREATE TABLE sales (
    sale_id INTEGER PRIMARY KEY,
    seller_name TEXT NOT NULL,
    category TEXT NOT NULL,
    region TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC NOT NULL CHECK (unit_price >= 0),
    sale_total NUMERIC NOT NULL CHECK (sale_total >= 0),
    sale_date TEXT NOT NULL
);

INSERT INTO sales (sale_id, seller_name, category, region, quantity, unit_price, sale_total, sale_date) VALUES
    (1, 'Ana', 'Books', 'South', 3, 59.90, 179.70, '2026-01-10'),
    (2, 'Ana', 'Hardware', 'South', 1, 349.00, 349.00, '2026-01-11'),
    (3, 'Bruno', 'Books', 'Southeast', 2, 89.90, 179.80, '2026-01-13'),
    (4, 'Bruno', 'Accessories', 'Southeast', 5, 39.90, 199.50, '2026-01-14'),
    (5, 'Carla', 'Software', 'Northeast', 2, 229.00, 458.00, '2026-01-15'),
    (6, 'Carla', 'Hardware', 'Northeast', 1, 1299.00, 1299.00, '2026-01-18'),
    (7, 'Diego', 'Accessories', 'South', 4, 149.90, 599.60, '2026-01-18'),
    (8, 'Diego', 'Books', 'South', 1, 72.00, 72.00, '2026-01-19'),
    (9, 'Elisa', 'Software', 'North', 3, 89.00, 267.00, '2026-01-21'),
    (10, 'Elisa', 'Accessories', 'North', 2, 119.00, 238.00, '2026-01-22'),
    (11, 'Ana', 'Software', 'South', 1, 399.00, 399.00, '2026-01-23'),
    (12, 'Bruno', 'Hardware', 'Southeast', 1, 699.00, 699.00, '2026-01-23');

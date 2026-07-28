PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS order_events;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    segment TEXT NOT NULL
);

CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL,
    total_amount NUMERIC NOT NULL,
    payment_method TEXT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_events (
    event_id INTEGER PRIMARY KEY,
    order_id INTEGER NOT NULL,
    event_type TEXT NOT NULL,
    created_at TEXT NOT NULL,
    payload TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

WITH RECURSIVE seq(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM seq WHERE n < 500
)
INSERT INTO customers (customer_id, email, full_name, segment)
SELECT
    n,
    'customer' || n || '@study.dev',
    'Customer ' || n,
    CASE
        WHEN n % 10 = 0 THEN 'vip'
        WHEN n % 3 = 0 THEN 'gold'
        ELSE 'standard'
    END
FROM seq;

WITH RECURSIVE seq(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM seq WHERE n < 4000
)
INSERT INTO orders (order_id, customer_id, status, created_at, total_amount, payment_method)
SELECT
    n,
    ((n - 1) % 500) + 1,
    CASE
        WHEN n % 11 = 0 THEN 'cancelled'
        WHEN n % 5 = 0 THEN 'pending'
        WHEN n % 3 = 0 THEN 'shipped'
        ELSE 'paid'
    END,
    datetime('2026-01-01', '+' || n || ' minutes'),
    (n % 17 + 1) * 35.50,
    CASE
        WHEN n % 4 = 0 THEN 'credit_card'
        WHEN n % 4 = 1 THEN 'pix'
        WHEN n % 4 = 2 THEN 'boleto'
        ELSE 'wallet'
    END
FROM seq;

WITH RECURSIVE seq(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM seq WHERE n < 8000
)
INSERT INTO order_events (event_id, order_id, event_type, created_at, payload)
SELECT
    n,
    ((n - 1) % 4000) + 1,
    CASE
        WHEN n % 4 = 0 THEN 'paid'
        WHEN n % 4 = 1 THEN 'created'
        WHEN n % 4 = 2 THEN 'packed'
        ELSE 'shipped'
    END,
    datetime('2026-01-01', '+' || n || ' minutes'),
    '{"source":"profiling-demo"}'
FROM seq;

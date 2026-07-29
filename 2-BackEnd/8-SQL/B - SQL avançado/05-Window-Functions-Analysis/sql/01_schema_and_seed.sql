DROP TABLE IF EXISTS sales_performance;

CREATE TABLE sales_performance (
    entry_id INTEGER PRIMARY KEY,
    seller_name TEXT NOT NULL,
    region TEXT NOT NULL,
    sale_month TEXT NOT NULL,
    revenue NUMERIC NOT NULL,
    orders_count INTEGER NOT NULL
);

INSERT INTO sales_performance VALUES
    (1, 'Ana', 'South', '2026-01', 3200.00, 12),
    (2, 'Ana', 'South', '2026-02', 4100.00, 15),
    (3, 'Ana', 'South', '2026-03', 3900.00, 14),
    (4, 'Bruno', 'Southeast', '2026-01', 2800.00, 10),
    (5, 'Bruno', 'Southeast', '2026-02', 4500.00, 18),
    (6, 'Bruno', 'Southeast', '2026-03', 4300.00, 16),
    (7, 'Carla', 'Northeast', '2026-01', 5100.00, 17),
    (8, 'Carla', 'Northeast', '2026-02', 4700.00, 16),
    (9, 'Carla', 'Northeast', '2026-03', 5300.00, 19),
    (10, 'Diego', 'North', '2026-01', 2100.00, 8),
    (11, 'Diego', 'North', '2026-02', 2600.00, 9),
    (12, 'Diego', 'North', '2026-03', 3000.00, 11);

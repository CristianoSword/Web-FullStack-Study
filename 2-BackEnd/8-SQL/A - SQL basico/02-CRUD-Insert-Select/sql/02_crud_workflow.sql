PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

INSERT INTO customers (customer_id, full_name, email, loyalty_level) VALUES
    (1, 'Ana Silva', 'ana@example.com', 'gold'),
    (2, 'Bruno Costa', 'bruno@example.com', 'standard'),
    (3, 'Carla Souza', 'carla@example.com', 'vip');

INSERT INTO categories (category_id, category_name) VALUES
    (1, 'Books'),
    (2, 'Hardware'),
    (3, 'Accessories');

INSERT INTO products (product_id, category_id, sku, product_name, unit_price, stock_quantity, active) VALUES
    (1, 1, 'BOOK-SQL-001', 'SQL for Backend Developers', 89.90, 25, 1),
    (2, 2, 'KB-MECH-002', 'Mechanical Keyboard', 349.50, 10, 1),
    (3, 3, 'MOUSE-ERG-003', 'Ergonomic Mouse', 199.00, 18, 1),
    (4, 1, 'BOOK-API-004', 'API Design Handbook', 72.00, 12, 1);

INSERT INTO orders (order_id, customer_id, status, order_total) VALUES
    (1001, 1, 'pending', 639.40),
    (1002, 2, 'paid', 72.00);

INSERT INTO order_items (order_item_id, order_id, product_id, quantity, unit_price, line_total) VALUES
    (1, 1001, 1, 1, 89.90, 89.90),
    (2, 1001, 2, 1, 349.50, 349.50),
    (3, 1001, 3, 1, 199.00, 199.00),
    (4, 1002, 4, 1, 72.00, 72.00);

UPDATE products
SET stock_quantity = stock_quantity - 1
WHERE product_id IN (1, 2, 3, 4);

UPDATE orders
SET status = 'paid'
WHERE order_id = 1001;

UPDATE customers
SET loyalty_level = 'vip'
WHERE customer_id = 1;

UPDATE products
SET unit_price = 79.90
WHERE product_id = 4;

UPDATE products
SET active = 0
WHERE product_id = 3;

COMMIT;

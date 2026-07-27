-- INNER JOIN customers with orders
SELECT
    c.customer_id,
    c.full_name,
    o.order_id,
    o.status
FROM customers c
INNER JOIN orders o ON o.customer_id = c.customer_id
ORDER BY c.customer_id, o.order_id;

-- INNER JOIN orders, items, and products
SELECT
    o.order_id,
    p.product_name,
    oi.quantity,
    p.unit_price,
    oi.quantity * p.unit_price AS line_total
FROM orders o
INNER JOIN order_items oi ON oi.order_id = o.order_id
INNER JOIN products p ON p.product_id = oi.product_id
ORDER BY o.order_id, p.product_name;

-- LEFT JOIN customers to orders to show clients without purchases
SELECT
    c.customer_id,
    c.full_name,
    c.city,
    o.order_id,
    o.status
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.customer_id
ORDER BY c.customer_id, o.order_id;

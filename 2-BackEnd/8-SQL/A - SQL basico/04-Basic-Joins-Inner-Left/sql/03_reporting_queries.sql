-- Customer order summary with LEFT JOIN
SELECT
    c.full_name,
    c.city,
    COUNT(o.order_id) AS total_orders
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.customer_id
GROUP BY c.customer_id, c.full_name, c.city
ORDER BY total_orders DESC, c.full_name ASC;

-- Detailed order report with INNER JOIN chain
SELECT
    o.order_id,
    c.full_name AS customer_name,
    p.product_name,
    oi.quantity,
    p.unit_price,
    oi.quantity * p.unit_price AS line_total
FROM orders o
INNER JOIN customers c ON c.customer_id = o.customer_id
INNER JOIN order_items oi ON oi.order_id = o.order_id
INNER JOIN products p ON p.product_id = oi.product_id
ORDER BY o.order_id, p.product_name;

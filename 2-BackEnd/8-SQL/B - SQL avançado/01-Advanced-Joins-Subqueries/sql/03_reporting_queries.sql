-- Customers with spending above global average order-item revenue
SELECT
    c.full_name,
    SUM(oi.quantity * oi.unit_price) AS customer_revenue
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
GROUP BY c.customer_id, c.full_name
HAVING SUM(oi.quantity * oi.unit_price) > (
    SELECT AVG(quantity * unit_price)
    FROM order_items
);

-- Orders containing items more expensive than category average
SELECT
    o.order_id,
    p.product_name,
    p.unit_price,
    cat.category_name
FROM orders o
JOIN order_items oi ON oi.order_id = o.order_id
JOIN products p ON p.product_id = oi.product_id
JOIN categories cat ON cat.category_id = p.category_id
WHERE p.unit_price > (
    SELECT AVG(p2.unit_price)
    FROM products p2
    WHERE p2.category_id = p.category_id
)
ORDER BY o.order_id, p.unit_price DESC;

-- Each customer's latest order date with total order count
SELECT
    c.full_name,
    MAX(o.created_at) AS latest_order_date,
    COUNT(o.order_id) AS total_orders
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.customer_id
GROUP BY c.customer_id, c.full_name
ORDER BY latest_order_date DESC;

-- Customer revenue with average comparison using subquery
SELECT
    c.customer_id,
    c.full_name,
    SUM(oi.quantity * oi.unit_price) AS customer_revenue,
    (
        SELECT AVG(customer_total)
        FROM (
            SELECT SUM(oi2.quantity * oi2.unit_price) AS customer_total
            FROM orders o2
            JOIN order_items oi2 ON oi2.order_id = o2.order_id
            GROUP BY o2.customer_id
        ) AS revenue_by_customer
    ) AS average_customer_revenue
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
GROUP BY c.customer_id, c.full_name
ORDER BY customer_revenue DESC;

-- Most valuable order per customer using correlated subquery
SELECT
    o.order_id,
    c.full_name,
    (
        SELECT SUM(oi2.quantity * oi2.unit_price)
        FROM order_items oi2
        WHERE oi2.order_id = o.order_id
    ) AS order_total
FROM orders o
JOIN customers c ON c.customer_id = o.customer_id
WHERE (
    SELECT SUM(oi3.quantity * oi3.unit_price)
    FROM order_items oi3
    WHERE oi3.order_id = o.order_id
) = (
    SELECT MAX(order_total)
    FROM (
        SELECT SUM(oi4.quantity * oi4.unit_price) AS order_total
        FROM orders o4
        JOIN order_items oi4 ON oi4.order_id = o4.order_id
        WHERE o4.customer_id = o.customer_id
        GROUP BY o4.order_id
    ) AS customer_orders
)
ORDER BY c.full_name, o.order_id;

-- Category revenue ranking with join chain
SELECT
    cat.category_name,
    SUM(oi.quantity * oi.unit_price) AS revenue,
    COUNT(DISTINCT o.order_id) AS orders_count
FROM categories cat
JOIN products p ON p.category_id = cat.category_id
JOIN order_items oi ON oi.product_id = p.product_id
JOIN orders o ON o.order_id = oi.order_id
GROUP BY cat.category_id, cat.category_name
ORDER BY revenue DESC;

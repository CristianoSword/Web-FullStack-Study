SELECT COUNT(*) AS customers_count FROM customers;
SELECT COUNT(*) AS orders_count FROM orders;
SELECT COUNT(*) AS order_items_count FROM order_items;

SELECT full_name, SUM(oi.quantity * oi.unit_price) AS customer_revenue
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
GROUP BY c.customer_id, c.full_name
ORDER BY customer_revenue DESC
LIMIT 1;

SELECT category_name, SUM(oi.quantity * oi.unit_price) AS revenue
FROM categories cat
JOIN products p ON p.category_id = cat.category_id
JOIN order_items oi ON oi.product_id = p.product_id
GROUP BY cat.category_id, category_name
ORDER BY revenue DESC
LIMIT 1;

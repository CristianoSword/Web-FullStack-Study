SELECT COUNT(*) AS customer_count FROM customers;
SELECT COUNT(*) AS category_count FROM categories;
SELECT COUNT(*) AS product_count FROM products;
SELECT COUNT(*) AS active_product_count FROM products WHERE active = 1;
SELECT COUNT(*) AS order_count FROM orders;
SELECT COUNT(*) AS order_item_count FROM order_items;

SELECT customer_id, loyalty_level
FROM customers
WHERE customer_id = 1;

SELECT product_id, stock_quantity, active
FROM products
ORDER BY product_id;

SELECT order_id, status
FROM orders
ORDER BY order_id;

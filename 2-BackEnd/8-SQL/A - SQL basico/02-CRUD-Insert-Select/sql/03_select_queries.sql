-- Customers and their loyalty tier
SELECT customer_id, full_name, email, loyalty_level
FROM customers
ORDER BY customer_id;

-- Active catalog items
SELECT product_id, sku, product_name, unit_price, stock_quantity
FROM products
WHERE active = 1
ORDER BY product_name;

-- Basic order list
SELECT order_id, customer_id, status, order_total, created_at
FROM orders
ORDER BY order_id;

-- Detailed order items
SELECT order_id, product_id, quantity, unit_price, line_total
FROM order_items
ORDER BY order_id, order_item_id;

-- Products deactivated instead of hard delete
SELECT product_id, product_name, active
FROM products
WHERE active = 0;

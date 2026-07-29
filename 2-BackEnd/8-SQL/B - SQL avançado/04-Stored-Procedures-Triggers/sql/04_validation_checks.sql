SELECT order_id, status, approved_at
FROM orders
ORDER BY order_id;

SELECT product_id, stock_quantity
FROM products
ORDER BY product_id;

SELECT COUNT(*) AS audit_rows
FROM inventory_audit;

SELECT product_id, action_name, previous_stock, new_stock
FROM inventory_audit
ORDER BY audit_id;

SELECT account_id, balance
FROM accounts
ORDER BY account_id;

SELECT product_id, stock_quantity
FROM products
ORDER BY product_id;

SELECT COUNT(*) AS orders_count FROM orders;
SELECT COUNT(*) AS ledger_entries_count FROM account_ledger;

SELECT order_id, status, total_amount
FROM orders
ORDER BY order_id;

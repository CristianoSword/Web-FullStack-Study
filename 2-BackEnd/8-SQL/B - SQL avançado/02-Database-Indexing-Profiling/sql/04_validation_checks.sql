SELECT COUNT(*) AS customer_count FROM customers;
SELECT COUNT(*) AS orders_count FROM orders;
SELECT COUNT(*) AS events_count FROM order_events;

PRAGMA index_list('customers');
PRAGMA index_list('orders');
PRAGMA index_list('order_events');

EXPLAIN QUERY PLAN
SELECT customer_id
FROM customers
WHERE email = 'customer120@study.dev';

EXPLAIN QUERY PLAN
SELECT order_id
FROM orders
WHERE status = 'pending'
ORDER BY created_at DESC
LIMIT 10;

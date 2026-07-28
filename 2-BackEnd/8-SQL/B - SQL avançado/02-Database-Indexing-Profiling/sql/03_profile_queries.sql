-- Lookup customer by email
EXPLAIN QUERY PLAN
SELECT customer_id, full_name, segment
FROM customers
WHERE email = 'customer120@study.dev';

SELECT customer_id, full_name, segment
FROM customers
WHERE email = 'customer120@study.dev';

-- Fetch recent paid orders for one customer
EXPLAIN QUERY PLAN
SELECT order_id, created_at, total_amount
FROM orders
WHERE customer_id = 120
  AND created_at >= '2026-01-02 00:00:00'
ORDER BY created_at DESC
LIMIT 20;

SELECT order_id, created_at, total_amount
FROM orders
WHERE customer_id = 120
  AND created_at >= '2026-01-02 00:00:00'
ORDER BY created_at DESC
LIMIT 20;

-- Global pending queue ordered by recency
EXPLAIN QUERY PLAN
SELECT order_id, customer_id, created_at
FROM orders
WHERE status = 'pending'
ORDER BY created_at DESC
LIMIT 25;

SELECT order_id, customer_id, created_at
FROM orders
WHERE status = 'pending'
ORDER BY created_at DESC
LIMIT 25;

-- Event lookup by order and type
EXPLAIN QUERY PLAN
SELECT event_id, created_at, payload
FROM order_events
WHERE order_id = 100
  AND event_type = 'paid'
ORDER BY created_at DESC;

SELECT event_id, created_at, payload
FROM order_events
WHERE order_id = 100
  AND event_type = 'paid'
ORDER BY created_at DESC;

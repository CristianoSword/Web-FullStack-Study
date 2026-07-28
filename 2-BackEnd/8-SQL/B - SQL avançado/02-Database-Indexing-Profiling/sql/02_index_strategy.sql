CREATE INDEX idx_customers_email_segment
ON customers (email, segment);

CREATE INDEX idx_orders_customer_created_at
ON orders (customer_id, created_at DESC);

CREATE INDEX idx_orders_status_created_at
ON orders (status, created_at DESC);

CREATE INDEX idx_orders_payment_status
ON orders (payment_method, status);

CREATE INDEX idx_order_events_order_type_created_at
ON order_events (order_id, event_type, created_at DESC);

ANALYZE;

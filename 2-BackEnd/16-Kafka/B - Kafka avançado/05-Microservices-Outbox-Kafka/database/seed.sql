INSERT INTO orders (id, customer_id, status, total_amount, created_at)
VALUES
  ('order-seed-001', 'customer-seed-001', 'CREATED', 249.80, '2026-06-29T12:00:00.000Z');

INSERT INTO order_items (id, order_id, sku, quantity, unit_price)
VALUES
  ('item-seed-001', 'order-seed-001', 'keyboard-mech', 1, 199.90),
  ('item-seed-002', 'order-seed-001', 'mouse-pad-xl', 1, 49.90);

INSERT INTO outbox_events (id, aggregate_id, aggregate_type, event_type, topic, payload, status, retries, published_at, created_at)
VALUES
  (
    'evt-seed-001',
    'order-seed-001',
    'Order',
    'OrderCreated',
    'orders.created.v1',
    '{"orderId":"order-seed-001","customerId":"customer-seed-001","status":"CREATED","totalAmount":249.80}',
    'PENDING',
    0,
    NULL,
    '2026-06-29T12:00:00.000Z'
  );

-- Successful checkout flow
BEGIN IMMEDIATE;

INSERT INTO orders (order_id, account_id, status, total_amount)
VALUES (5001, 1, 'created', 648.80);

INSERT INTO order_items (order_item_id, order_id, product_id, quantity, unit_price) VALUES
    (1, 5001, 1, 1, 349.00),
    (2, 5001, 2, 2, 149.90);

UPDATE accounts
SET balance = balance - 648.80
WHERE account_id = 1
  AND balance >= 648.80;

UPDATE products
SET stock_quantity = stock_quantity - 1
WHERE product_id = 1
  AND stock_quantity >= 1;

UPDATE products
SET stock_quantity = stock_quantity - 2
WHERE product_id = 2
  AND stock_quantity >= 2;

INSERT INTO account_ledger (ledger_id, account_id, order_id, entry_type, amount, note)
VALUES (1, 1, 5001, 'debit', 648.80, 'Successful checkout for order 5001');

UPDATE orders
SET status = 'paid'
WHERE order_id = 5001;

COMMIT;

-- Planned failure scenario for rollback validation
-- Order 5002 should fail because account 2 does not have enough balance
-- and product 3 does not have enough stock for quantity 3.
BEGIN IMMEDIATE;

INSERT INTO orders (order_id, account_id, status, total_amount)
VALUES (5002, 2, 'created', 3897.00);

INSERT INTO order_items (order_item_id, order_id, product_id, quantity, unit_price)
VALUES (3, 5002, 3, 3, 1299.00);

-- The validation harness must inspect current balance and stock,
-- abort this transaction, and issue ROLLBACK instead of COMMIT.

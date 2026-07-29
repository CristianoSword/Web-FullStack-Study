-- Current balances
SELECT account_id, owner_name, balance
FROM accounts
ORDER BY account_id;

-- Current stock
SELECT product_id, product_name, stock_quantity, unit_price
FROM products
ORDER BY product_id;

-- Orders with ledger entries
SELECT
    o.order_id,
    a.owner_name,
    o.status,
    o.total_amount,
    l.entry_type,
    l.amount,
    l.note
FROM orders o
JOIN accounts a ON a.account_id = o.account_id
LEFT JOIN account_ledger l ON l.order_id = o.order_id
ORDER BY o.order_id, l.ledger_id;

-- Order item breakdown
SELECT
    oi.order_id,
    p.product_name,
    oi.quantity,
    oi.unit_price
FROM order_items oi
JOIN products p ON p.product_id = oi.product_id
ORDER BY oi.order_id, oi.order_item_id;

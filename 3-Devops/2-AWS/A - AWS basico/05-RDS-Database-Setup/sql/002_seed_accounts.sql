INSERT INTO customer_accounts (email, plan)
VALUES
    ('alpha@example.com', 'starter'),
    ('beta@example.com', 'growth')
ON DUPLICATE KEY UPDATE plan = VALUES(plan);

-- List all user tables
SELECT name
FROM sqlite_master
WHERE type = 'table'
  AND name NOT LIKE 'sqlite_%'
ORDER BY name;

-- Inspect customer columns
PRAGMA table_info(customers);

-- Inspect order foreign keys
PRAGMA foreign_key_list(orders);

-- Inspect indexed columns
PRAGMA index_list(products);
PRAGMA index_list(order_items);

-- Show schema objects
SELECT type, name, tbl_name
FROM sqlite_master
WHERE name IN (
    'customers',
    'addresses',
    'categories',
    'products',
    'orders',
    'order_items',
    'payments',
    'vw_order_summary'
)
ORDER BY type, name;

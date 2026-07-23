SELECT 'customers' AS table_name, COUNT(*) AS column_count
FROM pragma_table_info('customers')
UNION ALL
SELECT 'orders', COUNT(*)
FROM pragma_table_info('orders')
UNION ALL
SELECT 'order_items', COUNT(*)
FROM pragma_table_info('order_items');

SELECT name
FROM sqlite_master
WHERE type = 'view'
  AND name = 'vw_order_summary';

SELECT COUNT(*) AS product_fk_count
FROM pragma_foreign_key_list('products');

SELECT COUNT(*) AS order_fk_count
FROM pragma_foreign_key_list('orders');

SELECT COUNT(*) AS order_item_fk_count
FROM pragma_foreign_key_list('order_items');

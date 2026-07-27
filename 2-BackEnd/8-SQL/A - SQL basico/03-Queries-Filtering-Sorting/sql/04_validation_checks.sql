SELECT COUNT(*) AS total_products FROM products;
SELECT COUNT(*) AS active_products FROM products WHERE active = 1;
SELECT COUNT(*) AS low_stock_products
FROM products
WHERE stock_quantity > 0
  AND stock_quantity <= 10;

SELECT product_name
FROM products
WHERE active = 1
ORDER BY unit_price DESC
LIMIT 1;

SELECT COUNT(*) AS books_count
FROM products
WHERE category = 'Books';

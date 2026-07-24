-- Active products sorted by price descending
SELECT product_id, product_name, category, unit_price
FROM products
WHERE active = 1
ORDER BY unit_price DESC;

-- Budget products between 50 and 200
SELECT product_id, product_name, unit_price
FROM products
WHERE unit_price BETWEEN 50 AND 200
  AND active = 1
ORDER BY unit_price ASC;

-- Hardware or accessories with strong ratings
SELECT product_id, product_name, category, rating
FROM products
WHERE category IN ('Hardware', 'Accessories')
  AND rating >= 4.5
ORDER BY rating DESC, product_name ASC;

-- Search by keyword
SELECT product_id, product_name, category
FROM products
WHERE product_name LIKE '%API%'
   OR product_name LIKE '%Dashboard%';

-- Low stock attention list
SELECT product_id, product_name, stock_quantity
FROM products
WHERE stock_quantity > 0
  AND stock_quantity <= 10
ORDER BY stock_quantity ASC, product_name ASC;

-- Paginated catalog page
SELECT product_id, sku, product_name, unit_price
FROM products
WHERE active = 1
ORDER BY product_name ASC
LIMIT 5 OFFSET 0;

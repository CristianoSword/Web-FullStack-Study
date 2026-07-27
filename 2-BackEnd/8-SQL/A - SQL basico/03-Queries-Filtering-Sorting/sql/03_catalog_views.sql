-- Premium storefront
SELECT product_name, category, unit_price, rating
FROM products
WHERE active = 1
  AND unit_price >= 300
ORDER BY rating DESC, unit_price DESC
LIMIT 4;

-- Search page for books only
SELECT product_name, unit_price, stock_quantity
FROM products
WHERE category = 'Books'
  AND active = 1
ORDER BY product_name ASC;

-- Stock alert widget
SELECT product_name, stock_quantity
FROM products
WHERE active = 1
  AND stock_quantity BETWEEN 1 AND 10
ORDER BY stock_quantity ASC;

-- Best rated list
SELECT product_name, rating
FROM products
WHERE active = 1
ORDER BY rating DESC, product_name ASC
LIMIT 5;

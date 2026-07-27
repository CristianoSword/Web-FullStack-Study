SELECT COUNT(*) AS total_rows FROM sales;
SELECT COUNT(DISTINCT seller_name) AS seller_count FROM sales;
SELECT COUNT(DISTINCT category) AS category_count FROM sales;

SELECT seller_name, SUM(sale_total) AS revenue
FROM sales
GROUP BY seller_name
ORDER BY revenue DESC
LIMIT 1;

SELECT category, SUM(sale_total) AS revenue
FROM sales
GROUP BY category
ORDER BY revenue DESC
LIMIT 1;

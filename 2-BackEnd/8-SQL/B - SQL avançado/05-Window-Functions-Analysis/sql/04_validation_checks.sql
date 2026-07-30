SELECT COUNT(*) AS rows_count FROM sales_performance;
SELECT COUNT(DISTINCT seller_name) AS sellers_count FROM sales_performance;
SELECT COUNT(DISTINCT sale_month) AS months_count FROM sales_performance;

SELECT seller_name, revenue
FROM sales_performance
WHERE sale_month = '2026-03'
ORDER BY revenue DESC
LIMIT 1;

SELECT seller_name, SUM(revenue) AS total_revenue
FROM sales_performance
GROUP BY seller_name
ORDER BY total_revenue DESC
LIMIT 1;

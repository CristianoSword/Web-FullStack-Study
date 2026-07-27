-- Revenue and ticket metrics by seller
SELECT
    seller_name,
    COUNT(*) AS total_sales,
    SUM(quantity) AS total_units,
    SUM(sale_total) AS gross_revenue,
    AVG(sale_total) AS average_sale_value,
    MIN(sale_total) AS smallest_sale,
    MAX(sale_total) AS biggest_sale
FROM sales
GROUP BY seller_name
ORDER BY gross_revenue DESC;

-- Category performance
SELECT
    category,
    COUNT(*) AS operations,
    SUM(quantity) AS units_sold,
    SUM(sale_total) AS revenue
FROM sales
GROUP BY category
ORDER BY revenue DESC;

-- Regional revenue above threshold
SELECT
    region,
    SUM(sale_total) AS revenue,
    AVG(sale_total) AS average_sale_value
FROM sales
GROUP BY region
HAVING SUM(sale_total) >= 800
ORDER BY revenue DESC;

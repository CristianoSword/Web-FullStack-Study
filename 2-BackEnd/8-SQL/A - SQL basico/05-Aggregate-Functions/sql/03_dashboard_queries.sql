-- Top 3 sellers by revenue
SELECT
    seller_name,
    SUM(sale_total) AS revenue
FROM sales
GROUP BY seller_name
ORDER BY revenue DESC
LIMIT 3;

-- Average ticket by category
SELECT
    category,
    ROUND(AVG(sale_total), 2) AS average_ticket
FROM sales
GROUP BY category
ORDER BY average_ticket DESC;

-- Revenue by month fragment
SELECT
    substr(sale_date, 1, 7) AS sale_month,
    SUM(sale_total) AS monthly_revenue,
    COUNT(*) AS operations
FROM sales
GROUP BY substr(sale_date, 1, 7)
ORDER BY sale_month;

-- Rank sellers by revenue within each month
SELECT
    sale_month,
    seller_name,
    revenue,
    ROW_NUMBER() OVER (
        PARTITION BY sale_month
        ORDER BY revenue DESC
    ) AS row_num,
    RANK() OVER (
        PARTITION BY sale_month
        ORDER BY revenue DESC
    ) AS revenue_rank
FROM sales_performance
ORDER BY sale_month, revenue_rank;

-- Running revenue total by seller across months
SELECT
    seller_name,
    sale_month,
    revenue,
    SUM(revenue) OVER (
        PARTITION BY seller_name
        ORDER BY sale_month
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_revenue
FROM sales_performance
ORDER BY seller_name, sale_month;

-- Revenue share inside each month
SELECT
    sale_month,
    seller_name,
    revenue,
    ROUND(
        revenue * 100.0 / SUM(revenue) OVER (PARTITION BY sale_month),
        2
    ) AS revenue_share_percent
FROM sales_performance
ORDER BY sale_month, revenue DESC;

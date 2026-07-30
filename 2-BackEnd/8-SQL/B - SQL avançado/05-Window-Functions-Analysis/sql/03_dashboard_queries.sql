-- Monthly delta per seller
SELECT
    seller_name,
    sale_month,
    revenue,
    revenue - LAG(revenue) OVER (
        PARTITION BY seller_name
        ORDER BY sale_month
    ) AS month_over_month_delta
FROM sales_performance
ORDER BY seller_name, sale_month;

-- Rolling 2-month average
SELECT
    seller_name,
    sale_month,
    revenue,
    ROUND(
        AVG(revenue) OVER (
            PARTITION BY seller_name
            ORDER BY sale_month
            ROWS BETWEEN 1 PRECEDING AND CURRENT ROW
        ),
        2
    ) AS rolling_two_month_avg
FROM sales_performance
ORDER BY seller_name, sale_month;

-- Best seller per region
SELECT *
FROM (
    SELECT
        region,
        seller_name,
        SUM(revenue) AS total_revenue,
        ROW_NUMBER() OVER (
            PARTITION BY region
            ORDER BY SUM(revenue) DESC
        ) AS regional_rank
    FROM sales_performance
    GROUP BY region, seller_name
) ranked
WHERE regional_rank = 1
ORDER BY region;

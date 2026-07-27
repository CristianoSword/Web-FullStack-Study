# Basic Joins Inner Left

SQL project for practicing `INNER JOIN` and `LEFT JOIN` across customers, orders, and products.

## Files

- `sql/01_schema_and_seed.sql`: schema and relational seed data
- `sql/02_join_queries.sql`: core join examples
- `sql/03_reporting_queries.sql`: reporting-oriented join queries
- `sql/04_validation_checks.sql`: smoke checks for join behavior

## Join Scenarios Covered

- customers with existing orders using `INNER JOIN`
- orders, items, and products in a chained `INNER JOIN`
- customers with and without orders using `LEFT JOIN`
- grouped summary of order counts per customer

## Validation

The dataset was smoke-tested in SQLite and confirmed:

- 4 customers
- 3 orders
- 4 order lines
- 2 customers without orders
- 4 valid joined order-item-product rows

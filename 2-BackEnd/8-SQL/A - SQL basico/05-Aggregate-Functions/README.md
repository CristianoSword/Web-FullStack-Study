# Aggregate Functions

SQL project for practicing `SUM`, `AVG`, `COUNT`, `MIN`, `MAX`, `GROUP BY`, and `HAVING` on sales data.

## Files

- `sql/01_schema_and_seed.sql`: sales dataset
- `sql/02_aggregate_queries.sql`: core aggregate examples
- `sql/03_dashboard_queries.sql`: reporting-style aggregates
- `sql/04_validation_checks.sql`: smoke checks for grouped results

## Covered Operations

- total revenue per seller
- average sale value per seller
- units sold and revenue per category
- regional rollups with `HAVING`
- top sellers and top categories
- monthly revenue summaries

## Validation

The dataset was smoke-tested in SQLite and confirmed:

- 12 sales rows
- 5 sellers
- 4 categories
- `Carla` as the top seller by revenue
- `Hardware` as the top category by revenue

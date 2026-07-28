# Advanced Joins Subqueries

SQL project for analytical reporting with complex joins and nested subqueries.

## Files

- `sql/01_schema_and_seed.sql`: analytical e-commerce dataset
- `sql/02_analytical_queries.sql`: advanced joins and correlated subqueries
- `sql/03_reporting_queries.sql`: reporting scenarios with nested filters
- `sql/04_validation_checks.sql`: smoke checks for revenue outputs

## Covered Patterns

- multi-table join chains
- correlated subqueries
- subqueries in `SELECT`, `WHERE`, and `HAVING`
- per-customer max-order analysis
- category revenue ranking

## Validation

The dataset was smoke-tested in SQLite and confirmed:

- 4 customers
- 5 orders
- 8 order items
- `Carla Souza` as top customer by revenue
- `Hardware` as top category by revenue

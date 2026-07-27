# Queries Filtering Sorting

SQL project for practicing `WHERE`, `ORDER BY`, `LIMIT`, ranges, and logical operators on a product catalog dataset.

## Files

- `sql/01_schema_and_seed.sql`: product catalog schema and seed data
- `sql/02_filtering_queries.sql`: main filtering and sorting examples
- `sql/03_catalog_views.sql`: ready-to-run catalog scenarios
- `sql/04_validation_checks.sql`: smoke checks for expected result shapes

## Query Patterns Covered

- `BETWEEN`
- `IN`
- `LIKE`
- combined `AND` / `OR`
- `ORDER BY` with multiple fields
- `LIMIT` and `OFFSET`

## Validation

The dataset was smoke-tested in SQLite and confirmed:

- 12 total products
- 11 active products
- `4K Monitor` as the highest-priced active item
- 3 low-stock active products
- 3 products in the `Books` category

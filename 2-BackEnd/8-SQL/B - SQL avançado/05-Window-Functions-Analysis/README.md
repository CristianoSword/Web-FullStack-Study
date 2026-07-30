# Window Functions Analysis

SQL project for analytical reporting with window functions such as `ROW_NUMBER`, `RANK`, and running totals.

## Files

- `sql/01_schema_and_seed.sql`: monthly seller performance dataset
- `sql/02_window_queries.sql`: ranking, cumulative totals, and share analysis
- `sql/03_dashboard_queries.sql`: deltas, rolling averages, and regional leaders
- `sql/04_validation_checks.sql`: smoke checks for ranking expectations

## Covered Window Functions

- `ROW_NUMBER`
- `RANK`
- `SUM() OVER`
- `LAG`
- `AVG() OVER`

## Validation

SQLite smoke validation confirmed:

- 12 rows
- 4 sellers
- 3 months
- `Carla` as top seller in `2026-03`
- `Carla` as top seller in total accumulated revenue

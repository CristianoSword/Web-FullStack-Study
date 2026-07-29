# Stored Procedures Triggers

SQL project for database automation with triggers and stored-procedure-style business flows.

## Files

- `sql/01_schema_and_seed.sql`: products, orders, items, and audit schema
- `sql/02_postgres_procedures.sql`: real PL/pgSQL procedures for approval and restocking
- `sql/03_sqlite_triggers_and_usage.sql`: executable SQLite triggers and local usage flow
- `sql/04_validation_checks.sql`: state verification queries

## Covered Automation

- stored procedure for order approval in PostgreSQL
- stored procedure for restocking in PostgreSQL
- trigger to auto-fill `approved_at`
- trigger to log inventory adjustments

## Validation

SQLite smoke validation confirmed:

- order `7001` moved to `approved`
- `approved_at` was set automatically
- product `1` stock dropped from `10` to `9`
- product `2` stock dropped from `20` to `18`
- 2 audit rows were generated

## Note

SQLite does not support stored procedures, so local execution validates the trigger layer while the procedure layer is delivered as source-complete PostgreSQL SQL.

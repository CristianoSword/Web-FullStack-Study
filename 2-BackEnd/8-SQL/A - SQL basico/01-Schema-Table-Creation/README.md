# Schema Table Creation

SQL project for modeling an e-commerce relational schema with tables, primary keys, foreign keys, indexes, and validation assets.

## Scope

The schema covers:

- customers
- shipping addresses
- product categories
- products
- orders
- order items
- payments

## Files

- `sql/01_tables.sql`: base table definitions
- `sql/02_constraints_indexes.sql`: relational rebuild with foreign keys, checks, indexes, and summary view
- `sql/03_schema_inspection.sql`: inspection queries for schema navigation
- `sql/04_validation_checks.sql`: validation queries used after schema creation

## Validation

The schema was smoke-tested locally with SQLite in memory to confirm:

- table creation succeeds
- foreign keys are present
- `vw_order_summary` is created

## Notes

This project is intentionally SQL-first, so the “interface” layer is represented by inspection queries that a learner can run directly in a SQL console.

# Database Indexing Profiling

SQL project for studying index design and execution-plan profiling with SQLite.

## Files

- `sql/01_schema_and_seed.sql`: customers, orders, and order events dataset
- `sql/02_index_strategy.sql`: composite and covering-friendly indexes
- `sql/03_profile_queries.sql`: `EXPLAIN QUERY PLAN` + real query scenarios
- `sql/04_validation_checks.sql`: smoke checks for row counts and index availability

## Covered Topics

- unique lookup by email
- composite index for customer + date queries
- composite index for status + chronological queue processing
- event-history index for order timeline lookups
- use of `ANALYZE` to refresh planner statistics

## Validation

The project was smoke-tested in SQLite and confirmed:

- 500 customers
- 4,000 orders
- 8,000 order events
- indexed search for pending orders
- indexed search for order events by `order_id` and `event_type`

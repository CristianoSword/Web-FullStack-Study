# CRUD Insert Select

SQL project for practicing inserts, reads, updates, and safe delete flows on an e-commerce dataset.

## Files

- `sql/01_schema.sql`: relational schema for customers, categories, products, orders, and order items
- `sql/02_crud_workflow.sql`: insert, update, and soft-delete workflow
- `sql/03_select_queries.sql`: read queries for common inspection scenarios
- `sql/04_validation_checks.sql`: verification queries after executing the workflow

## Covered Operations

- insert seed data for customers, categories, products, and orders
- update order status and customer loyalty tier
- update product pricing
- soft delete a product by deactivating it
- read back active catalog, customers, and orders

## Validation

The schema and CRUD flow were smoke-tested with SQLite in memory to confirm:

- 3 customers were inserted
- 4 products were created
- 1 product was deactivated
- order `1001` moved to `paid`
- customer `1` was upgraded to `vip`

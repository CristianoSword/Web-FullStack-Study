# Transactions ACID

SQL project for studying transactional integrity, commit, rollback, and lock behavior.

## Files

- `sql/01_schema_and_seed.sql`: accounts, products, orders, items, and ledger schema
- `sql/02_transaction_flows.sql`: successful checkout and planned rollback scenario
- `sql/03_audit_queries.sql`: state inspection queries after transactions
- `sql/04_validation_checks.sql`: SQL readback checks
- `scripts/verify_acid.py`: smoke harness for commit, rollback, and lock detection

## Covered ACID Aspects

- atomic checkout write sequence
- rollback on business-rule violation
- durable ledger entry after commit
- consistency through balance and stock checks
- isolation/locking with `BEGIN IMMEDIATE`

## Validation

The validation harness confirmed:

- 1 committed order
- 1 persisted ledger entry
- account `1` debited correctly to `1851.2`
- account `2` unchanged after rollback
- product `3` stock unchanged after rollback
- lock contention detected across concurrent SQLite connections

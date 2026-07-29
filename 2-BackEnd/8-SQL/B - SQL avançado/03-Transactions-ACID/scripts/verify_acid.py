from __future__ import annotations

import sqlite3
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[1]
DB_PATH = BASE_DIR / "acid_validation.sqlite3"


def load_schema(connection: sqlite3.Connection) -> None:
    schema = (BASE_DIR / "sql" / "01_schema_and_seed.sql").read_text(encoding="utf-8")
    connection.executescript(schema)


def run_successful_checkout(connection: sqlite3.Connection) -> None:
    connection.execute("BEGIN IMMEDIATE")

    balance = connection.execute(
        "SELECT balance FROM accounts WHERE account_id = 1"
    ).fetchone()[0]
    total = 648.80
    if balance < total:
        raise RuntimeError("Unexpected insufficient balance in success flow.")

    stock_keyboard = connection.execute(
        "SELECT stock_quantity FROM products WHERE product_id = 1"
    ).fetchone()[0]
    stock_hub = connection.execute(
        "SELECT stock_quantity FROM products WHERE product_id = 2"
    ).fetchone()[0]
    if stock_keyboard < 1 or stock_hub < 2:
        raise RuntimeError("Unexpected insufficient stock in success flow.")

    connection.execute(
        "INSERT INTO orders (order_id, account_id, status, total_amount) VALUES (5001, 1, 'created', 648.80)"
    )
    connection.executemany(
        "INSERT INTO order_items (order_item_id, order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?, ?)",
        [
            (1, 5001, 1, 1, 349.00),
            (2, 5001, 2, 2, 149.90),
        ],
    )
    connection.execute(
        "UPDATE accounts SET balance = balance - 648.80 WHERE account_id = 1"
    )
    connection.execute(
        "UPDATE products SET stock_quantity = stock_quantity - 1 WHERE product_id = 1"
    )
    connection.execute(
        "UPDATE products SET stock_quantity = stock_quantity - 2 WHERE product_id = 2"
    )
    connection.execute(
        """
        INSERT INTO account_ledger (ledger_id, account_id, order_id, entry_type, amount, note)
        VALUES (1, 1, 5001, 'debit', 648.80, 'Successful checkout for order 5001')
        """
    )
    connection.execute("UPDATE orders SET status = 'paid' WHERE order_id = 5001")
    connection.commit()


def run_failed_checkout(connection: sqlite3.Connection) -> None:
    connection.execute("BEGIN IMMEDIATE")
    try:
        connection.execute(
            "INSERT INTO orders (order_id, account_id, status, total_amount) VALUES (5002, 2, 'created', 3897.00)"
        )
        connection.execute(
            """
            INSERT INTO order_items (order_item_id, order_id, product_id, quantity, unit_price)
            VALUES (3, 5002, 3, 3, 1299.00)
            """
        )

        balance = connection.execute(
            "SELECT balance FROM accounts WHERE account_id = 2"
        ).fetchone()[0]
        stock = connection.execute(
            "SELECT stock_quantity FROM products WHERE product_id = 3"
        ).fetchone()[0]

        if balance < 3897.00 or stock < 3:
            raise RuntimeError("Business rule violation: insufficient balance or stock.")

        connection.commit()
    except RuntimeError:
        connection.rollback()


def demonstrate_locking() -> bool:
    conn_a = sqlite3.connect(DB_PATH, timeout=0.1)
    conn_b = sqlite3.connect(DB_PATH, timeout=0.1)
    try:
        conn_a.execute("BEGIN IMMEDIATE")
        try:
            conn_b.execute("BEGIN IMMEDIATE")
        except sqlite3.OperationalError:
            return True
        return False
    finally:
        conn_a.rollback()
        conn_a.close()
        conn_b.close()


def main() -> None:
    if DB_PATH.exists():
        DB_PATH.unlink()

    connection = sqlite3.connect(DB_PATH)
    try:
        load_schema(connection)
        run_successful_checkout(connection)
        run_failed_checkout(connection)

        orders_count = connection.execute("SELECT COUNT(*) FROM orders").fetchone()[0]
        ledger_count = connection.execute("SELECT COUNT(*) FROM account_ledger").fetchone()[0]
        account_one_balance = connection.execute(
            "SELECT balance FROM accounts WHERE account_id = 1"
        ).fetchone()[0]
        account_two_balance = connection.execute(
            "SELECT balance FROM accounts WHERE account_id = 2"
        ).fetchone()[0]
        monitor_stock = connection.execute(
            "SELECT stock_quantity FROM products WHERE product_id = 3"
        ).fetchone()[0]
        lock_detected = demonstrate_locking()

        print("orders_count", orders_count)
        print("ledger_count", ledger_count)
        print("account_one_balance", account_one_balance)
        print("account_two_balance", account_two_balance)
        print("monitor_stock", monitor_stock)
        print("lock_detected", lock_detected)
    finally:
        connection.close()


if __name__ == "__main__":
    main()

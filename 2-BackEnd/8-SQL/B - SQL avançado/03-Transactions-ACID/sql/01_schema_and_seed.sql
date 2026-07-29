PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS account_ledger;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
    account_id INTEGER PRIMARY KEY,
    owner_name TEXT NOT NULL,
    balance NUMERIC NOT NULL CHECK (balance >= 0)
);

CREATE TABLE products (
    product_id INTEGER PRIMARY KEY,
    product_name TEXT NOT NULL,
    stock_quantity INTEGER NOT NULL CHECK (stock_quantity >= 0),
    unit_price NUMERIC NOT NULL CHECK (unit_price >= 0)
);

CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    account_id INTEGER NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('created', 'paid', 'cancelled')),
    total_amount NUMERIC NOT NULL CHECK (total_amount >= 0),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

CREATE TABLE order_items (
    order_item_id INTEGER PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC NOT NULL CHECK (unit_price >= 0),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE account_ledger (
    ledger_id INTEGER PRIMARY KEY,
    account_id INTEGER NOT NULL,
    order_id INTEGER,
    entry_type TEXT NOT NULL CHECK (entry_type IN ('debit', 'credit')),
    amount NUMERIC NOT NULL CHECK (amount >= 0),
    note TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

INSERT INTO accounts VALUES
    (1, 'Ana Silva', 2500.00),
    (2, 'Bruno Costa', 120.00),
    (3, 'Carla Souza', 800.00);

INSERT INTO products VALUES
    (1, 'Mechanical Keyboard', 10, 349.00),
    (2, 'USB-C Hub', 20, 149.90),
    (3, '4K Monitor', 2, 1299.00);

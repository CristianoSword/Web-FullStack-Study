PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS inventory_audit;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    product_id INTEGER PRIMARY KEY,
    product_name TEXT NOT NULL,
    stock_quantity INTEGER NOT NULL CHECK (stock_quantity >= 0),
    unit_price NUMERIC NOT NULL CHECK (unit_price >= 0)
);

CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    customer_name TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('draft', 'approved', 'cancelled')),
    approved_at TEXT
);

CREATE TABLE order_items (
    order_item_id INTEGER PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE inventory_audit (
    audit_id INTEGER PRIMARY KEY,
    product_id INTEGER NOT NULL,
    order_id INTEGER,
    action_name TEXT NOT NULL,
    previous_stock INTEGER NOT NULL,
    new_stock INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

INSERT INTO products VALUES
    (1, 'Mechanical Keyboard', 10, 349.00),
    (2, 'USB-C Hub', 20, 149.90),
    (3, '4K Monitor', 4, 1299.00);

INSERT INTO orders VALUES
    (7001, 'Ana Silva', 'draft', NULL),
    (7002, 'Bruno Costa', 'draft', NULL);

INSERT INTO order_items VALUES
    (1, 7001, 1, 1),
    (2, 7001, 2, 2),
    (3, 7002, 3, 1);

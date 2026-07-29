CREATE TRIGGER trg_orders_set_approved_at
AFTER UPDATE OF status ON orders
FOR EACH ROW
WHEN NEW.status = 'approved' AND OLD.status <> 'approved'
BEGIN
    UPDATE orders
    SET approved_at = datetime('now')
    WHERE order_id = NEW.order_id;
END;

CREATE TRIGGER trg_products_inventory_audit
AFTER UPDATE OF stock_quantity ON products
FOR EACH ROW
WHEN NEW.stock_quantity <> OLD.stock_quantity
BEGIN
    INSERT INTO inventory_audit (
        product_id,
        order_id,
        action_name,
        previous_stock,
        new_stock
    )
    VALUES (
        NEW.product_id,
        NULL,
        'stock_adjustment',
        OLD.stock_quantity,
        NEW.stock_quantity
    );
END;

-- Local SQLite usage example equivalent to an order approval flow
UPDATE products
SET stock_quantity = stock_quantity - 1
WHERE product_id = 1;

UPDATE products
SET stock_quantity = stock_quantity - 2
WHERE product_id = 2;

UPDATE orders
SET status = 'approved'
WHERE order_id = 7001;

-- PostgreSQL stored procedure examples for approval and restocking flows

CREATE OR REPLACE PROCEDURE approve_order(p_order_id INTEGER)
LANGUAGE plpgsql
AS $$
DECLARE
    item_record RECORD;
    current_stock INTEGER;
BEGIN
    FOR item_record IN
        SELECT product_id, quantity
        FROM order_items
        WHERE order_id = p_order_id
    LOOP
        SELECT stock_quantity
        INTO current_stock
        FROM products
        WHERE product_id = item_record.product_id
        FOR UPDATE;

        IF current_stock < item_record.quantity THEN
            RAISE EXCEPTION 'Insufficient stock for product %', item_record.product_id;
        END IF;

        UPDATE products
        SET stock_quantity = stock_quantity - item_record.quantity
        WHERE product_id = item_record.product_id;
    END LOOP;

    UPDATE orders
    SET status = 'approved',
        approved_at = CURRENT_TIMESTAMP
    WHERE order_id = p_order_id;
END;
$$;

CREATE OR REPLACE PROCEDURE restock_product(
    p_product_id INTEGER,
    p_quantity INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE products
    SET stock_quantity = stock_quantity + p_quantity
    WHERE product_id = p_product_id;
END;
$$;

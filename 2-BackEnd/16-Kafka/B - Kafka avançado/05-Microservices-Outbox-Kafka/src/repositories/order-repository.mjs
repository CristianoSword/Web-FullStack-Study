export function createOrderRepository(database) {
  const insertOrderStatement = database.prepare(`
    INSERT INTO orders (id, customer_id, status, total_amount, created_at)
    VALUES (@id, @customerId, @status, @totalAmount, @createdAt)
  `);

  const insertOrderItemStatement = database.prepare(`
    INSERT INTO order_items (id, order_id, sku, quantity, unit_price)
    VALUES (@id, @orderId, @sku, @quantity, @unitPrice)
  `);

  const selectOrdersStatement = database.prepare(`
    SELECT id, customer_id, status, total_amount, created_at
    FROM orders
    ORDER BY created_at DESC
  `);

  const selectItemsByOrderIdStatement = database.prepare(`
    SELECT id, order_id, sku, quantity, unit_price
    FROM order_items
    WHERE order_id = ?
    ORDER BY sku ASC
  `);

  const selectOrderByIdStatement = database.prepare(`
    SELECT id, customer_id, status, total_amount, created_at
    FROM orders
    WHERE id = ?
  `);

  const updateOrderStatusStatement = database.prepare(`
    UPDATE orders
    SET status = @status
    WHERE id = @id
  `);

  function insertOrder(order) {
    insertOrderStatement.run(order);
  }

  function insertOrderItems(items) {
    for (const item of items) {
      insertOrderItemStatement.run(item);
    }
  }

  function mapOrderRecord(orderRow) {
    return {
      id: orderRow.id,
      customerId: orderRow.customer_id,
      status: orderRow.status,
      totalAmount: orderRow.total_amount,
      createdAt: orderRow.created_at,
      items: selectItemsByOrderIdStatement.all(orderRow.id).map((itemRow) => ({
        id: itemRow.id,
        orderId: itemRow.order_id,
        sku: itemRow.sku,
        quantity: itemRow.quantity,
        unitPrice: itemRow.unit_price
      }))
    };
  }

  function listOrders() {
    return selectOrdersStatement.all().map(mapOrderRecord);
  }

  function findOrderById(orderId) {
    const row = selectOrderByIdStatement.get(orderId);
    return row ? mapOrderRecord(row) : null;
  }

  function updateOrderStatus({ id, status }) {
    updateOrderStatusStatement.run({ id, status });
  }

  return {
    insertOrder,
    insertOrderItems,
    listOrders,
    findOrderById,
    updateOrderStatus
  };
}

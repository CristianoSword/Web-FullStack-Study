export const sagaEventTypes = {
  reserveInventory: "inventory.reserve",
  inventoryReserved: "inventory.reserved",
  inventoryReleased: "inventory.released",
  capturePayment: "payment.capture",
  paymentCaptured: "payment.captured",
  paymentRefunded: "payment.refunded",
  createShipment: "shipping.create",
  shipmentCreated: "shipping.created",
  sagaCompleted: "saga.completed",
  sagaFailed: "saga.failed"
};

export const createSagaMessage = ({ sagaId, type, payload }) => ({
  sagaId,
  type,
  payload,
  occurredAt: new Date().toISOString()
});

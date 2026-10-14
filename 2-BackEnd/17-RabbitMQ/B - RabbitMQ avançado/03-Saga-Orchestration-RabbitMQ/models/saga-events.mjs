export const sagaEventTypes = {
  reserveInventory: "inventory.reserve",
  releaseInventory: "inventory.release",
  inventoryReserved: "inventory.reserved",
  inventoryFailed: "inventory.failed",
  inventoryReleased: "inventory.released",
  capturePayment: "payment.capture",
  refundPayment: "payment.refund",
  paymentCaptured: "payment.captured",
  paymentFailed: "payment.failed",
  paymentRefunded: "payment.refunded",
  createShipment: "shipping.create",
  shipmentCreated: "shipping.created",
  shippingFailed: "shipping.failed",
  sagaCompleted: "saga.completed",
  sagaFailed: "saga.failed"
};

export const createSagaMessage = ({ sagaId, type, payload }) => ({
  sagaId,
  type,
  payload,
  occurredAt: new Date().toISOString()
});

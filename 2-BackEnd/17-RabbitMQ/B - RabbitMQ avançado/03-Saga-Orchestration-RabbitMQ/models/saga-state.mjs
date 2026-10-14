export const createSagaRecord = (order) => ({
  sagaId: order.sagaId,
  customerId: order.customerId,
  status: "pending",
  step: "inventory.reserve",
  order,
  history: [
    {
      at: new Date().toISOString(),
      type: "saga.created",
      message: "Saga accepted for orchestration."
    }
  ],
  compensations: []
});

export const appendSagaHistory = (record, type, message, patch = {}) => ({
  ...record,
  ...patch,
  history: [
    ...record.history,
    {
      at: new Date().toISOString(),
      type,
      message
    }
  ]
});

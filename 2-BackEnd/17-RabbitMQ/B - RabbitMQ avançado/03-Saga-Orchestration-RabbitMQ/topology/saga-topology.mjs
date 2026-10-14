export const sagaTopology = {
  exchange: "orders.saga.exchange",
  queues: {
    inventoryCommands: "orders.inventory.commands",
    paymentCommands: "orders.payment.commands",
    shippingCommands: "orders.shipping.commands",
    orchestratorEvents: "orders.orchestrator.events"
  },
  routingKeys: {
    inventoryReserve: "inventory.reserve",
    inventoryRelease: "inventory.release",
    paymentCapture: "payment.capture",
    paymentRefund: "payment.refund",
    shippingCreate: "shipping.create",
    orchestratorPattern: "#"
  }
};

export const assertSagaTopology = async (channel) => {
  await channel.assertExchange(sagaTopology.exchange, "topic", { durable: true });

  await channel.assertQueue(sagaTopology.queues.inventoryCommands, { durable: true });
  await channel.assertQueue(sagaTopology.queues.paymentCommands, { durable: true });
  await channel.assertQueue(sagaTopology.queues.shippingCommands, { durable: true });
  await channel.assertQueue(sagaTopology.queues.orchestratorEvents, { durable: true });

  await channel.bindQueue(sagaTopology.queues.inventoryCommands, sagaTopology.exchange, "inventory.*");
  await channel.bindQueue(sagaTopology.queues.paymentCommands, sagaTopology.exchange, "payment.*");
  await channel.bindQueue(sagaTopology.queues.shippingCommands, sagaTopology.exchange, "shipping.*");
  await channel.bindQueue(
    sagaTopology.queues.orchestratorEvents,
    sagaTopology.exchange,
    sagaTopology.routingKeys.orchestratorPattern
  );
};

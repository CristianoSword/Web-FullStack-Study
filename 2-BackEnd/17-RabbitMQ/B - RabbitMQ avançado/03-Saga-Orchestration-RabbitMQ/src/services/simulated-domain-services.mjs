import { createSagaMessage, sagaEventTypes } from "../../models/saga-events.mjs";
import { sagaTopology } from "../../topology/saga-topology.mjs";
import { getRabbitResources, publishSagaMessage } from "../lib/rabbitmq-connection.mjs";

const handlers = {
  async "inventory.reserve"(event) {
    if (event.payload.items.some((item) => item.quantity > 20)) {
      return createSagaMessage({
        sagaId: event.sagaId,
        type: sagaEventTypes.inventoryFailed,
        payload: event.payload
      });
    }

    return createSagaMessage({
      sagaId: event.sagaId,
      type: sagaEventTypes.inventoryReserved,
      payload: event.payload
    });
  },
  async "inventory.release"(event) {
    return createSagaMessage({
      sagaId: event.sagaId,
      type: sagaEventTypes.inventoryReleased,
      payload: event.payload
    });
  },
  async "payment.capture"(event) {
    if (event.payload.flags.paymentShouldFail) {
      return createSagaMessage({
        sagaId: event.sagaId,
        type: sagaEventTypes.paymentFailed,
        payload: event.payload
      });
    }

    return createSagaMessage({
      sagaId: event.sagaId,
      type: sagaEventTypes.paymentCaptured,
      payload: event.payload
    });
  },
  async "payment.refund"(event) {
    return createSagaMessage({
      sagaId: event.sagaId,
      type: sagaEventTypes.paymentRefunded,
      payload: event.payload
    });
  },
  async "shipping.create"(event) {
    if (event.payload.flags.shippingShouldFail) {
      return createSagaMessage({
        sagaId: event.sagaId,
        type: sagaEventTypes.shippingFailed,
        payload: event.payload
      });
    }

    return createSagaMessage({
      sagaId: event.sagaId,
      type: sagaEventTypes.shipmentCreated,
      payload: event.payload
    });
  }
};

const consumeQueue = async (queueName) => {
  const { channel } = await getRabbitResources();

  await channel.consume(queueName, async (message) => {
    if (!message) {
      return;
    }

    const event = JSON.parse(message.content.toString("utf8"));
    const handler = handlers[event.type];

    if (!handler) {
      channel.ack(message);
      return;
    }

    const nextEvent = await handler(event);
    await publishSagaMessage(nextEvent.type, nextEvent);
    channel.ack(message);
  });
};

export const startSimulatedDomainServices = async () => {
  await consumeQueue(sagaTopology.queues.inventoryCommands);
  await consumeQueue(sagaTopology.queues.paymentCommands);
  await consumeQueue(sagaTopology.queues.shippingCommands);
};

import { applyOrderEvent } from "../domain/order-projection.mjs";

function buildStatusCodeError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function buildOrderEvent(orderId, eventType, payload, version) {
  return {
    eventId: `${orderId}-${eventType}-${Date.now()}`,
    orderId,
    eventType,
    version,
    occurredAt: new Date().toISOString(),
    payload
  };
}

export function createEventStoreService({ config, admin, producer }) {
  const projections = new Map();
  const streams = new Map();

  function appendToMemory(orderId, event) {
    const currentStream = streams.get(orderId) ?? [];
    streams.set(orderId, [...currentStream, event]);
    projections.set(orderId, applyOrderEvent(projections.get(orderId), event));
  }

  function requireProjection(orderId) {
    const projection = projections.get(orderId);

    if (!projection) {
      throw buildStatusCodeError(`Order ${orderId} was not created yet.`, 404);
    }

    return projection;
  }

  return {
    async bootstrapTopic() {
      await admin.createTopics({
        waitForLeaders: true,
        topics: [
          {
            topic: config.ordersTopic,
            numPartitions: config.partitions,
            replicationFactor: config.replicationFactor
          }
        ]
      });
    },

    async appendEvent({ orderId, eventType, payload }) {
      const currentStream = streams.get(orderId) ?? [];
      const version = currentStream.length + 1;
      const event = buildOrderEvent(orderId, eventType, payload, version);

      await producer.send({
        topic: config.ordersTopic,
        messages: [
          {
            key: orderId,
            value: JSON.stringify(event)
          }
        ]
      });

      appendToMemory(orderId, event);

      return event;
    },

    async createOrder({ orderId, customerId, totalAmount }) {
      if (projections.has(orderId)) {
        throw buildStatusCodeError(`Order ${orderId} already exists.`, 409);
      }

      return this.appendEvent({
        orderId,
        eventType: "OrderCreated",
        payload: {
          customerId,
          totalAmount
        }
      });
    },

    async payOrder({ orderId, paymentId }) {
      const projection = requireProjection(orderId);

      if (projection.status !== "CREATED") {
        throw buildStatusCodeError(
          `Order ${orderId} cannot be paid from status ${projection.status}.`,
          409
        );
      }

      return this.appendEvent({
        orderId,
        eventType: "OrderPaid",
        payload: {
          paymentId
        }
      });
    },

    async cancelOrder({ orderId, reason }) {
      const projection = requireProjection(orderId);

      if (projection.status === "CANCELLED" || projection.status === "SHIPPED") {
        throw buildStatusCodeError(
          `Order ${orderId} cannot be cancelled from status ${projection.status}.`,
          409
        );
      }

      return this.appendEvent({
        orderId,
        eventType: "OrderCancelled",
        payload: {
          reason
        }
      });
    },

    async shipOrder({ orderId, trackingCode }) {
      const projection = requireProjection(orderId);

      if (projection.status !== "PAID") {
        throw buildStatusCodeError(
          `Order ${orderId} can only be shipped after payment. Current status: ${projection.status}.`,
          409
        );
      }

      return this.appendEvent({
        orderId,
        eventType: "OrderShipped",
        payload: {
          trackingCode
        }
      });
    },

    replayOrder(orderId) {
      const events = streams.get(orderId) ?? [];

      if (events.length === 0) {
        return null;
      }

      const projection = events.reduce((currentProjection, event) => {
        return applyOrderEvent(currentProjection, event);
      }, null);

      projections.set(orderId, projection);
      return projection;
    },

    getProjection(orderId) {
      return projections.get(orderId) ?? null;
    },

    listEvents(orderId) {
      return streams.get(orderId) ?? [];
    },

    getStatus() {
      return {
        serviceName: config.serviceName,
        topic: config.ordersTopic,
        projectedOrders: projections.size,
        eventStreams: streams.size
      };
    }
  };
}

import { applyOrderEvent } from "../domain/order-projection.mjs";

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

      streams.set(orderId, [...currentStream, event]);
      projections.set(orderId, applyOrderEvent(projections.get(orderId), event));

      return event;
    },

    replayOrder(orderId) {
      const events = streams.get(orderId) ?? [];

      return events.reduce((projection, event) => applyOrderEvent(projection, event), null);
    },

    getProjection(orderId) {
      return projections.get(orderId) ?? null;
    },

    listEvents(orderId) {
      return streams.get(orderId) ?? [];
    }
  };
}

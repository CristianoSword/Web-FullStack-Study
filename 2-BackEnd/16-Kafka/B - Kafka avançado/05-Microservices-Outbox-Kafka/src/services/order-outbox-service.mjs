import { randomUUID } from "node:crypto";

import { normalizeCreateOrderCommand, validateCreateOrderCommand } from "../domain/order-validator.mjs";

export function createOrderOutboxService({
  config,
  admin,
  producer,
  database,
  orderRepository,
  outboxRepository
}) {
  async function bootstrapTopic() {
    await admin.createTopics({
      waitForLeaders: true,
      topics: [
        {
          topic: config.topic,
          numPartitions: 3,
          replicationFactor: 1
        }
      ]
    });
  }

  function createOrder(command) {
    const errors = validateCreateOrderCommand(command);

    if (errors.length > 0) {
      return {
        ok: false,
        stage: "create-order",
        errors
      };
    }

    const normalized = normalizeCreateOrderCommand(command);
    const createdAt = new Date().toISOString();
    const orderId = randomUUID();
    const eventId = randomUUID();
    const totalAmount = normalized.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );

    const orderRecord = {
      id: orderId,
      customerId: normalized.customerId,
      status: "CREATED",
      totalAmount,
      createdAt
    };

    const orderItems = normalized.items.map((item) => ({
      id: randomUUID(),
      orderId,
      sku: item.sku,
      quantity: item.quantity,
      unitPrice: item.unitPrice
    }));

    const eventPayload = {
      eventId,
      eventType: "OrderCreated",
      occurredAt: createdAt,
      order: {
        orderId,
        customerId: normalized.customerId,
        status: "CREATED",
        totalAmount,
        items: normalized.items
      }
    };

    const outboxEvent = {
      id: eventId,
      aggregateId: orderId,
      aggregateType: "Order",
      eventType: "OrderCreated",
      topic: config.topic,
      payload: eventPayload,
      status: "PENDING",
      retries: 0,
      publishedAt: null,
      createdAt
    };

    const transaction = database.transaction(() => {
      orderRepository.insertOrder(orderRecord);
      orderRepository.insertOrderItems(orderItems);
      outboxRepository.insertOutboxEvent(outboxEvent);
    });

    transaction();

    return {
      ok: true,
      stage: "create-order",
      order: {
        ...orderRecord,
        items: orderItems
      },
      outboxEvent
    };
  }

  async function publishPendingEvents() {
    const pendingEvents = outboxRepository.listPending(config.batchSize);

    const published = [];
    const failed = [];

    for (const event of pendingEvents) {
      try {
        await producer.send({
          topic: event.topic,
          messages: [
            {
              key: event.aggregateId,
              headers: {
                eventId: event.id,
                eventType: event.eventType,
                aggregateType: event.aggregateType
              },
              value: JSON.stringify(event.payload)
            }
          ]
        });

        const publishedAt = new Date().toISOString();
        outboxRepository.markPublished({
          id: event.id,
          publishedAt
        });
        orderRepository.updateOrderStatus({
          id: event.aggregateId,
          status: "PUBLISHED"
        });

        published.push({
          ...event,
          status: "PUBLISHED",
          publishedAt
        });
      } catch (error) {
        outboxRepository.markFailed({ id: event.id });
        failed.push({
          eventId: event.id,
          message: error.message
        });
      }
    }

    return {
      ok: failed.length === 0,
      stage: "publish-outbox",
      totals: {
        pending: pendingEvents.length,
        published: published.length,
        failed: failed.length
      },
      published,
      failed
    };
  }

  function listOrders() {
    return orderRepository.listOrders();
  }

  function listOutboxEvents() {
    return outboxRepository.listAll();
  }

  function getStatus() {
    const outboxEvents = outboxRepository.listAll();
    const counts = outboxEvents.reduce(
      (accumulator, event) => {
        accumulator[event.status] = (accumulator[event.status] ?? 0) + 1;
        return accumulator;
      },
      {}
    );

    return {
      serviceName: config.serviceName,
      brokers: config.brokers,
      databasePath: config.databasePath,
      topic: config.topic,
      pollIntervalMs: config.pollIntervalMs,
      totals: {
        orders: orderRepository.listOrders().length,
        outboxEvents: outboxEvents.length
      },
      outboxByStatus: counts
    };
  }

  return {
    bootstrapTopic,
    createOrder,
    publishPendingEvents,
    listOrders,
    listOutboxEvents,
    getStatus
  };
}

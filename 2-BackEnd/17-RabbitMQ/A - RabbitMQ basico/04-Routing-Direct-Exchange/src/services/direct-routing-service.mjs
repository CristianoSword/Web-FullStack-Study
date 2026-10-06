import { randomUUID } from "node:crypto";

function buildReceipts(topology) {
  return topology.queues.map((queue) => ({
    consumerId: queue.consumerId,
    queue: queue.name,
    routingKey: queue.routingKey,
    receivedCount: 0,
    lastMessageAt: null
  }));
}

export function createDirectRoutingService({ config, connection, setupChannel, topology }) {
  const publishedLogs = [];
  const routedDeliveries = [];
  const routingReceipts = buildReceipts(topology);
  const consumerChannels = [];

  async function bootstrapTopology() {
    await setupChannel.assertExchange(
      topology.exchange.name,
      topology.exchange.type,
      {
        durable: topology.exchange.durable
      }
    );

    for (const queue of topology.queues) {
      await setupChannel.assertQueue(queue.name, {
        durable: queue.durable
      });

      await setupChannel.bindQueue(
        queue.name,
        topology.exchange.name,
        queue.routingKey
      );
    }
  }

  async function startConsumers() {
    for (const queue of topology.queues) {
      const channel = await connection.createChannel();
      consumerChannels.push(channel);

      await channel.assertQueue(queue.name, { durable: queue.durable });
      await channel.consume(
        queue.name,
        (message) => {
          if (!message) {
            return;
          }

          const log = JSON.parse(message.content.toString("utf8"));
          const receipt = routingReceipts.find((entry) => entry.queue === queue.name);

          routedDeliveries.push({
            consumerId: queue.consumerId,
            queue: queue.name,
            routingKey: queue.routingKey,
            eventId: log.eventId,
            severity: log.severity,
            receivedAt: new Date().toISOString(),
            payload: log.payload
          });

          if (receipt) {
            receipt.receivedCount += 1;
            receipt.lastMessageAt = new Date().toISOString();
          }

          channel.ack(message);
        },
        {
          noAck: false,
          consumerTag: queue.consumerId
        }
      );
    }
  }

  async function publishLog(input) {
    const log = {
      eventId: input.eventId ?? randomUUID(),
      severity: input.severity ?? "info",
      message: input.message ?? "Application log routed through direct exchange",
      payload: input.payload ?? {
        source: "api",
        module: "notifications"
      },
      createdAt: new Date().toISOString()
    };

    setupChannel.publish(
      topology.exchange.name,
      log.severity,
      Buffer.from(JSON.stringify(log)),
      {
        persistent: true,
        contentType: "application/json",
        messageId: log.eventId,
        type: log.severity
      }
    );

    publishedLogs.push(log);

    return {
      ok: true,
      log
    };
  }

  function getStatus() {
    return {
      serviceName: config.serviceName,
      exchange: topology.exchange.name,
      routes: topology.queues.map((queue) => ({
        queue: queue.name,
        routingKey: queue.routingKey
      })),
      metrics: {
        publishedLogs: publishedLogs.length,
        routedDeliveries: routedDeliveries.length,
        consumers: routingReceipts.length
      }
    };
  }

  async function close() {
    for (const channel of consumerChannels) {
      await channel.close().catch(() => {});
    }
  }

  return {
    bootstrapTopology,
    startConsumers,
    publishLog,
    getStatus,
    getPublishedLogs: () => publishedLogs,
    getRoutingReceipts: () => routingReceipts,
    getRoutedDeliveries: () => routedDeliveries,
    close
  };
}

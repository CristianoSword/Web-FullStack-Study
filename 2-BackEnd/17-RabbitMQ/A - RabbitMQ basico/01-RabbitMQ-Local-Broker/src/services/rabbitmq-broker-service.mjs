import { randomUUID } from "node:crypto";

export function createRabbitMqBrokerService({ config, channel, topology }) {
  const publishedMessages = [];
  const consumedMessages = [];
  const deadLetterMessages = [];
  const consumerReceipt = {
    consumerTag: null,
    ackedMessages: 0,
    lastMessageAt: null
  };

  async function bootstrapTopology() {
    for (const exchange of topology.exchanges) {
      await channel.assertExchange(exchange.name, exchange.type, {
        durable: exchange.durable
      });
    }

    for (const queue of topology.queues) {
      await channel.assertQueue(queue.name, {
        durable: queue.durable,
        arguments: queue.arguments
      });
    }

    for (const binding of topology.bindings) {
      await channel.bindQueue(
        binding.destination,
        binding.source,
        binding.routingKey
      );
    }
  }

  async function startConsumer() {
    await channel.prefetch(1);

    const consumer = await channel.consume(
      config.mainQueue,
      (message) => {
        if (!message) {
          return;
        }

        const payload = JSON.parse(message.content.toString("utf8"));
        consumedMessages.push({
          deliveryTag: message.fields.deliveryTag,
          routingKey: message.fields.routingKey,
          exchange: message.fields.exchange,
          payload,
          consumedAt: new Date().toISOString()
        });

        channel.ack(message);
        consumerReceipt.ackedMessages += 1;
        consumerReceipt.lastMessageAt = new Date().toISOString();
      },
      {
        noAck: false
      }
    );

    consumerReceipt.consumerTag = consumer.consumerTag;

    await channel.consume(
      config.deadLetterQueue,
      (message) => {
        if (!message) {
          return;
        }

        const payload = JSON.parse(message.content.toString("utf8"));
        deadLetterMessages.push({
          deliveryTag: message.fields.deliveryTag,
          routingKey: message.fields.routingKey,
          payload,
          consumedAt: new Date().toISOString()
        });
        channel.ack(message);
      },
      {
        noAck: false
      }
    );

    return consumerReceipt;
  }

  async function publishMessage(input) {
    const envelope = {
      messageId: input.messageId ?? randomUUID(),
      type: input.type ?? "InfoEvent",
      payload: input.payload ?? {
        message: "RabbitMQ local broker message"
      },
      createdAt: input.createdAt ?? new Date().toISOString()
    };

    channel.publish(
      config.exchange,
      input.routingKey ?? config.routingKey,
      Buffer.from(JSON.stringify(envelope)),
      {
        persistent: true,
        contentType: "application/json",
        messageId: envelope.messageId,
        type: envelope.type
      }
    );

    publishedMessages.push({
      routingKey: input.routingKey ?? config.routingKey,
      exchange: config.exchange,
      envelope,
      publishedAt: new Date().toISOString()
    });

    return {
      ok: true,
      envelope
    };
  }

  async function routeToDeadLetter(input) {
    const envelope = {
      messageId: input.messageId ?? randomUUID(),
      type: input.type ?? "DeadLetterEvent",
      payload: input.payload ?? {
        reason: "manual-dlq-route"
      },
      createdAt: input.createdAt ?? new Date().toISOString()
    };

    channel.publish(
      config.deadLetterExchange,
      input.routingKey ?? "manual.dlq",
      Buffer.from(JSON.stringify(envelope)),
      {
        persistent: true,
        contentType: "application/json",
        messageId: envelope.messageId,
        type: envelope.type
      }
    );

    return {
      ok: true,
      envelope
    };
  }

  function getStatus() {
    return {
      serviceName: config.serviceName,
      amqpUrl: config.amqpUrl,
      managementUrl: config.managementUrl,
      topology: {
        exchange: config.exchange,
        deadLetterExchange: config.deadLetterExchange,
        mainQueue: config.mainQueue,
        deadLetterQueue: config.deadLetterQueue,
        routingKey: config.routingKey
      },
      metrics: {
        publishedMessages: publishedMessages.length,
        consumedMessages: consumedMessages.length,
        deadLetterMessages: deadLetterMessages.length
      },
      consumerReceipt
    };
  }

  return {
    bootstrapTopology,
    startConsumer,
    publishMessage,
    routeToDeadLetter,
    getStatus,
    getPublishedMessages: () => publishedMessages,
    getConsumedMessages: () => consumedMessages,
    getDeadLetterMessages: () => deadLetterMessages
  };
}

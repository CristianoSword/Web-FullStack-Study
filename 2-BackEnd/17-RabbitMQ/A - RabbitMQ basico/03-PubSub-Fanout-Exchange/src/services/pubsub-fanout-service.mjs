import { randomUUID } from "node:crypto";

function buildSubscriberReceipts(topology) {
  return topology.queues.map((queue) => ({
    subscriberId: queue.subscriberId,
    queue: queue.name,
    receivedCount: 0,
    lastEventAt: null
  }));
}

export function createPubSubFanoutService({ config, connection, setupChannel, topology }) {
  const publishedEvents = [];
  const subscriberMessages = [];
  const subscriberReceipts = buildSubscriberReceipts(topology);
  const subscriberChannels = [];

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

      await setupChannel.bindQueue(queue.name, topology.exchange.name, "");
    }
  }

  async function startSubscribers() {
    for (const queue of topology.queues) {
      const channel = await connection.createChannel();
      subscriberChannels.push(channel);

      await channel.assertQueue(queue.name, { durable: queue.durable });
      await channel.consume(
        queue.name,
        (message) => {
          if (!message) {
            return;
          }

          const event = JSON.parse(message.content.toString("utf8"));
          const receipt = subscriberReceipts.find((entry) => entry.queue === queue.name);

          subscriberMessages.push({
            subscriberId: queue.subscriberId,
            queue: queue.name,
            eventId: event.eventId,
            receivedAt: new Date().toISOString(),
            payload: event.payload
          });

          if (receipt) {
            receipt.receivedCount += 1;
            receipt.lastEventAt = new Date().toISOString();
          }

          channel.ack(message);
        },
        {
          noAck: false,
          consumerTag: queue.subscriberId
        }
      );
    }
  }

  async function publishEvent(input) {
    const event = {
      eventId: input.eventId ?? randomUUID(),
      eventType: input.eventType ?? "CampaignBroadcasted",
      payload: input.payload ?? {
        campaignId: "campaign-1001",
        audience: "all-subscribers"
      },
      publishedAt: new Date().toISOString()
    };

    setupChannel.publish(
      topology.exchange.name,
      "",
      Buffer.from(JSON.stringify(event)),
      {
        persistent: true,
        contentType: "application/json",
        messageId: event.eventId,
        type: event.eventType
      }
    );

    publishedEvents.push(event);

    return {
      ok: true,
      event
    };
  }

  function getStatus() {
    return {
      serviceName: config.serviceName,
      exchange: topology.exchange.name,
      subscriberQueues: topology.queues.map((queue) => queue.name),
      metrics: {
        publishedEvents: publishedEvents.length,
        deliveredMessages: subscriberMessages.length,
        subscribers: subscriberReceipts.length
      }
    };
  }

  async function close() {
    for (const channel of subscriberChannels) {
      await channel.close().catch(() => {});
    }
  }

  return {
    bootstrapTopology,
    startSubscribers,
    publishEvent,
    getStatus,
    getPublishedEvents: () => publishedEvents,
    getSubscriberReceipts: () => subscriberReceipts,
    getSubscriberMessages: () => subscriberMessages,
    close
  };
}

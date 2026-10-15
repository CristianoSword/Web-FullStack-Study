import { normalizeClusterMessage } from "../../models/quorum-message.mjs";
import { clusterTopology } from "../../topology/cluster-topology.mjs";
import { getRabbitResources } from "../lib/rabbitmq-connection.mjs";

export class QuorumQueueService {
  constructor() {
    this.events = {
      published: [],
      consumed: [],
      deadLetters: []
    };
  }

  async publish(rawPayload) {
    const message = normalizeClusterMessage(rawPayload);
    const { channel } = await getRabbitResources();

    channel.publish(
      clusterTopology.exchange,
      clusterTopology.routingKey,
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
        contentType: "application/json",
        messageId: message.messageId
      }
    );

    this.events.published.unshift(message);
    return message;
  }

  async startConsumers() {
    const { channel } = await getRabbitResources();
    await channel.consume(clusterTopology.queue, async (message) => {
      if (!message) {
        return;
      }

      const parsed = JSON.parse(message.content.toString("utf8"));
      this.events.consumed.unshift({
        ...parsed,
        consumedAt: new Date().toISOString()
      });
      channel.ack(message);
    });

    await channel.consume(clusterTopology.deadLetterQueue, async (message) => {
      if (!message) {
        return;
      }

      const parsed = JSON.parse(message.content.toString("utf8"));
      this.events.deadLetters.unshift({
        ...parsed,
        observedAt: new Date().toISOString()
      });
      channel.ack(message);
    });
  }

  snapshot() {
    return {
      published: this.events.published.slice(0, 20),
      consumed: this.events.consumed.slice(0, 20),
      deadLetters: this.events.deadLetters.slice(0, 20)
    };
  }
}

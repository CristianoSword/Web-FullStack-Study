import amqp from "amqplib";

import { runtimeConfig } from "../../config/runtime-config.mjs";
import { assertObservabilityTopology, observabilityTopology } from "../../topology/observability-topology.mjs";

let cachedResources;

export const getRabbitResources = async () => {
  if (cachedResources) {
    return cachedResources;
  }

  const connection = await amqp.connect(runtimeConfig.rabbitmq.url);
  const channel = await connection.createChannel();
  await assertObservabilityTopology(channel);

  cachedResources = { connection, channel };
  return cachedResources;
};

export const publishObservedMessage = async ({ envelope, headers }) => {
  const { channel } = await getRabbitResources();
  channel.publish(
    observabilityTopology.exchange,
    observabilityTopology.routingKey,
    Buffer.from(JSON.stringify(envelope)),
    {
      persistent: true,
      contentType: "application/json",
      headers
    }
  );
};

export const shutdownRabbitResources = async () => {
  if (!cachedResources) {
    return;
  }

  await cachedResources.channel.close();
  await cachedResources.connection.close();
  cachedResources = null;
};

import amqp from "amqplib";

import { runtimeConfig } from "../../config/runtime-config.mjs";
import { assertSagaTopology, sagaTopology } from "../../topology/saga-topology.mjs";

let cachedResources;

export const getRabbitResources = async () => {
  if (cachedResources) {
    return cachedResources;
  }

  const connection = await amqp.connect(runtimeConfig.rabbitmq.url);
  const channel = await connection.createChannel();
  await assertSagaTopology(channel);

  cachedResources = { connection, channel };
  return cachedResources;
};

export const publishSagaMessage = async (routingKey, message) => {
  const { channel } = await getRabbitResources();
  channel.publish(
    sagaTopology.exchange,
    routingKey,
    Buffer.from(JSON.stringify(message)),
    {
      persistent: true,
      contentType: "application/json"
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

import amqp from "amqplib";

import { runtimeConfig } from "../../config/runtime-config.mjs";
import { assertPriorityTopology, priorityTopology } from "../../topology/priority-topology.mjs";

let cachedResources;

const managementHeaders = () => ({
  Authorization: `Basic ${Buffer.from(
    `${runtimeConfig.rabbitmq.username}:${runtimeConfig.rabbitmq.password}`
  ).toString("base64")}`
});

export const getRabbitResources = async () => {
  if (cachedResources) {
    return cachedResources;
  }

  const connection = await amqp.connect(runtimeConfig.rabbitmq.url);
  const channel = await connection.createChannel();
  await assertPriorityTopology(channel, runtimeConfig.scheduler);

  cachedResources = {
    connection,
    channel
  };

  return cachedResources;
};

export const publishAuditEvent = async (event) => {
  const { channel } = await getRabbitResources();
  channel.publish(
    priorityTopology.exchanges.audit,
    priorityTopology.routingKeys.audit,
    Buffer.from(JSON.stringify(event)),
    { persistent: true, contentType: "application/json" }
  );
};

export const fetchQueuePressure = async () => {
  const queue = encodeURIComponent(priorityTopology.queues.priority);
  const url = `${runtimeConfig.rabbitmq.managementUrl}/queues/%2F/${queue}`;
  const response = await fetch(url, { headers: managementHeaders() });

  if (!response.ok) {
    return {
      queuedMessages: 0,
      inFlight: 0
    };
  }

  const data = await response.json();

  return {
    queuedMessages: data.messages ?? 0,
    inFlight: data.messages_unacknowledged ?? 0
  };
};

export const shutdownRabbitResources = async () => {
  if (!cachedResources) {
    return;
  }

  await cachedResources.channel.close();
  await cachedResources.connection.close();
  cachedResources = null;
};

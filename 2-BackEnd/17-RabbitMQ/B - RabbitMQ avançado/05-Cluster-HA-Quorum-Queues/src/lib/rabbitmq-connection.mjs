import amqp from "amqplib";

import { runtimeConfig } from "../../config/runtime-config.mjs";
import { assertClusterTopology } from "../../topology/cluster-topology.mjs";

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
  await assertClusterTopology(channel);

  cachedResources = { connection, channel };
  return cachedResources;
};

export const fetchManagementResource = async (resource) => {
  const response = await fetch(`${runtimeConfig.rabbitmq.managementUrl}/${resource}`, {
    headers: managementHeaders()
  });

  if (!response.ok) {
    throw new Error(`Failed to load ${resource}: ${response.status}`);
  }

  return response.json();
};

export const shutdownRabbitResources = async () => {
  if (!cachedResources) {
    return;
  }

  await cachedResources.channel.close();
  await cachedResources.connection.close();
  cachedResources = null;
};

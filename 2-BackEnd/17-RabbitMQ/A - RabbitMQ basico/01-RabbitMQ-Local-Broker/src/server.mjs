import { createApp } from "./app.mjs";
import { createRabbitConnection } from "./lib/create-connection.mjs";
import { loadConfig, loadTopology } from "./lib/load-config.mjs";
import { createRabbitMqBrokerService } from "./services/rabbitmq-broker-service.mjs";

const config = await loadConfig();
const topology = await loadTopology();

const connection = await createRabbitConnection(config);
const channel = await connection.createChannel();

const brokerService = createRabbitMqBrokerService({
  config,
  channel,
  topology
});

await brokerService.bootstrapTopology();
await brokerService.startConsumer();

const app = createApp({
  config,
  brokerService
});

const shutdown = async () => {
  await channel.close().catch(() => {});
  await connection.close().catch(() => {});
  await app.close().catch(() => {});
  process.exit(0);
};

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);

await app.listen({
  host: "0.0.0.0",
  port: config.httpPort
});

console.log(`RabbitMQ Local Broker API listening on http://localhost:${config.httpPort}`);

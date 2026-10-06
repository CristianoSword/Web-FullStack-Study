import { createApp } from "./app.mjs";
import { createRabbitConnection } from "./lib/create-connection.mjs";
import { loadConfig, loadTopology } from "./lib/load-config.mjs";
import { createPubSubFanoutService } from "./services/pubsub-fanout-service.mjs";

const config = await loadConfig();
const topology = await loadTopology();

const connection = await createRabbitConnection(config);
const setupChannel = await connection.createChannel();

const pubSubFanoutService = createPubSubFanoutService({
  config,
  connection,
  setupChannel,
  topology
});

await pubSubFanoutService.bootstrapTopology();
await pubSubFanoutService.startSubscribers();

const app = createApp({
  config,
  pubSubFanoutService
});

const shutdown = async () => {
  await pubSubFanoutService.close().catch(() => {});
  await setupChannel.close().catch(() => {});
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

console.log(`PubSub Fanout Exchange API listening on http://localhost:${config.httpPort}`);

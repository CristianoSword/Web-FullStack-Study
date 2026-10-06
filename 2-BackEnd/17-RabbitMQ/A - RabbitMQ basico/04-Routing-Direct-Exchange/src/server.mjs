import { createApp } from "./app.mjs";
import { createRabbitConnection } from "./lib/create-connection.mjs";
import { loadConfig, loadTopology } from "./lib/load-config.mjs";
import { createDirectRoutingService } from "./services/direct-routing-service.mjs";

const config = await loadConfig();
const topology = await loadTopology();

const connection = await createRabbitConnection(config);
const setupChannel = await connection.createChannel();

const directRoutingService = createDirectRoutingService({
  config,
  connection,
  setupChannel,
  topology
});

await directRoutingService.bootstrapTopology();
await directRoutingService.startConsumers();

const app = createApp({
  config,
  directRoutingService
});

const shutdown = async () => {
  await directRoutingService.close().catch(() => {});
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

console.log(`Routing Direct Exchange API listening on http://localhost:${config.httpPort}`);

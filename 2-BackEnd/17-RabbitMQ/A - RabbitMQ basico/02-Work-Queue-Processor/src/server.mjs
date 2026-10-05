import { createApp } from "./app.mjs";
import { createRabbitConnection } from "./lib/create-connection.mjs";
import { loadConfig, loadTopology } from "./lib/load-config.mjs";
import { createWorkQueueService } from "./services/work-queue-service.mjs";

const config = await loadConfig();
const topology = await loadTopology();

const connection = await createRabbitConnection(config);
const setupChannel = await connection.createChannel();

const workQueueService = createWorkQueueService({
  config,
  connection,
  setupChannel,
  topology
});

await workQueueService.bootstrapTopology();
await workQueueService.startWorkers();
await workQueueService.startDeadLetterConsumer();

const app = createApp({
  config,
  workQueueService
});

const shutdown = async () => {
  await workQueueService.close().catch(() => {});
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

console.log(`Work Queue Processor API listening on http://localhost:${config.httpPort}`);

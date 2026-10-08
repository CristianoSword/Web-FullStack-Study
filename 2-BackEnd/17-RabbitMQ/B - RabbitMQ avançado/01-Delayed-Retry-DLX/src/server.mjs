import { createApp } from "./app.mjs";
import { createRabbitConnection } from "./lib/create-connection.mjs";
import { loadConfig, loadTopology } from "./lib/load-config.mjs";
import { createDelayedRetryService } from "./services/delayed-retry-service.mjs";

const config = await loadConfig();
const topology = await loadTopology();

const connection = await createRabbitConnection(config);
const setupChannel = await connection.createChannel();

const delayedRetryService = createDelayedRetryService({
  config,
  connection,
  setupChannel,
  topology
});

await delayedRetryService.bootstrapTopology();
await delayedRetryService.startWorker();
await delayedRetryService.startDeadLetterConsumer();

const app = createApp({
  config,
  delayedRetryService
});

const shutdown = async () => {
  await delayedRetryService.close().catch(() => {});
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

console.log(`Delayed Retry DLX API listening on http://localhost:${config.httpPort}`);

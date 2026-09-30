import { createApp } from "./app.mjs";
import { createKafkaClient } from "./lib/create-client.mjs";
import { loadConfig } from "./lib/load-config.mjs";
import { createEventStoreService } from "./services/event-store-service.mjs";

const config = await loadConfig();
const kafka = createKafkaClient(config);
const admin = kafka.admin();
const producer = kafka.producer();

await admin.connect();
await producer.connect();

const eventStoreService = createEventStoreService({
  config,
  admin,
  producer
});

await eventStoreService.bootstrapTopic();

const app = createApp({ config, eventStoreService });

process.once("SIGINT", async () => {
  await producer.disconnect().catch(() => {});
  await admin.disconnect().catch(() => {});
  await app.close().catch(() => {});
  process.exit(0);
});

process.once("SIGTERM", async () => {
  await producer.disconnect().catch(() => {});
  await admin.disconnect().catch(() => {});
  await app.close().catch(() => {});
  process.exit(0);
});

await app.listen({
  host: "0.0.0.0",
  port: config.httpPort
});

console.log(`Event sourcing orders API listening on http://localhost:${config.httpPort}`);

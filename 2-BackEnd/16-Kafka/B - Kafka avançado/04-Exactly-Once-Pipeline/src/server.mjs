import { createApp } from "./app.mjs";
import { createKafkaClient, createTransactionalProducer } from "./lib/create-client.mjs";
import { loadConfig } from "./lib/load-config.mjs";
import { createExactlyOnceService } from "./services/exactly-once-service.mjs";

const config = await loadConfig();
const kafka = createKafkaClient(config);
const admin = kafka.admin();
const producer = createTransactionalProducer(kafka, config);

await admin.connect();
await producer.connect();

const exactlyOnceService = createExactlyOnceService({
  config,
  admin,
  producer
});

await exactlyOnceService.bootstrapTopics();

const app = createApp({
  config,
  exactlyOnceService
});

const shutdown = async () => {
  await producer.disconnect().catch(() => {});
  await admin.disconnect().catch(() => {});
  await app.close().catch(() => {});
  process.exit(0);
};

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);

await app.listen({
  host: "0.0.0.0",
  port: config.httpPort
});

console.log(`Exactly Once Pipeline API listening on http://localhost:${config.httpPort}`);

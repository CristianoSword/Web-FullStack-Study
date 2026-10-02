import { createApp } from "./app.mjs";
import { createKafkaClient } from "./lib/create-client.mjs";
import { loadConfig, loadSchemaFile } from "./lib/load-config.mjs";
import { openDatabase } from "./lib/open-database.mjs";
import { createOrderRepository } from "./repositories/order-repository.mjs";
import { createOutboxRepository } from "./repositories/outbox-repository.mjs";
import { createOrderOutboxService } from "./services/order-outbox-service.mjs";

const config = await loadConfig();
const schemaSql = await loadSchemaFile("database/schema.sql");
const database = await openDatabase({
  databasePath: config.databasePath,
  schemaSql
});

const kafka = createKafkaClient(config);
const admin = kafka.admin();
const producer = kafka.producer();

await admin.connect();
await producer.connect();

const orderRepository = createOrderRepository(database);
const outboxRepository = createOutboxRepository(database);
const orderOutboxService = createOrderOutboxService({
  config,
  admin,
  producer,
  database,
  orderRepository,
  outboxRepository
});

await orderOutboxService.bootstrapTopic();

const app = createApp({
  config,
  orderOutboxService
});

const pollTimer = setInterval(() => {
  orderOutboxService.publishPendingEvents().catch(() => {});
}, config.pollIntervalMs);

const shutdown = async () => {
  clearInterval(pollTimer);
  await producer.disconnect().catch(() => {});
  await admin.disconnect().catch(() => {});
  await app.close().catch(() => {});
  database.close();
  process.exit(0);
};

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);

await app.listen({
  host: "0.0.0.0",
  port: config.httpPort
});

console.log(`Microservices Outbox Kafka API listening on http://localhost:${config.httpPort}`);

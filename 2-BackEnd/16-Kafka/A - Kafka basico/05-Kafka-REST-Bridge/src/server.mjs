import { createApp } from "./app.mjs";
import { createKafkaClient } from "./lib/create-client.mjs";
import { createEventStore } from "./lib/event-store.mjs";
import { loadConfig } from "./lib/load-config.mjs";
import { createBridgeService } from "./services/bridge-service.mjs";

const config = await loadConfig();
const kafka = createKafkaClient(config);
const admin = kafka.admin();
const producer = kafka.producer();
const eventStore = createEventStore();

await admin.connect();
await producer.connect();

const bridgeService = createBridgeService({
  config,
  admin,
  producer,
  eventStore
});

await bridgeService.bootstrapTopic();

const app = createApp({ config, bridgeService });

process.once("SIGINT", async () => {
  await producer.disconnect().catch(() => {});
  await admin.disconnect().catch(() => {});
  await app.close().catch(() => {});
  process.exit(0);
});

await app.listen({
  host: "0.0.0.0",
  port: config.httpPort
});

console.log(`Kafka REST bridge listening on http://localhost:${config.httpPort}`);

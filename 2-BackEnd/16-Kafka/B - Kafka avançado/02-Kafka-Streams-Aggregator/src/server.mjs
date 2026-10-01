import { createApp } from "./app.mjs";
import { createKafkaClient } from "./lib/create-client.mjs";
import { loadConfig } from "./lib/load-config.mjs";
import { createStreamAggregatorService } from "./services/stream-aggregator-service.mjs";

const config = await loadConfig();
const kafka = createKafkaClient(config);
const admin = kafka.admin();
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: config.consumerGroup });

await admin.connect();
await producer.connect();

const streamAggregatorService = createStreamAggregatorService({
  config,
  admin,
  producer,
  consumer
});

await streamAggregatorService.bootstrapTopics();
await streamAggregatorService.startStreamProcessor();

const app = createApp({ config, streamAggregatorService });

process.once("SIGINT", async () => {
  await streamAggregatorService.shutdown().catch(() => {});
  await producer.disconnect().catch(() => {});
  await admin.disconnect().catch(() => {});
  await app.close().catch(() => {});
  process.exit(0);
});

process.once("SIGTERM", async () => {
  await streamAggregatorService.shutdown().catch(() => {});
  await producer.disconnect().catch(() => {});
  await admin.disconnect().catch(() => {});
  await app.close().catch(() => {});
  process.exit(0);
});

await app.listen({
  host: "0.0.0.0",
  port: config.httpPort
});

console.log(`Kafka streams aggregator listening on http://localhost:${config.httpPort}`);

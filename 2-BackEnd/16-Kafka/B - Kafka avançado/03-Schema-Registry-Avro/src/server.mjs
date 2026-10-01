import { createApp } from "./app.mjs";
import { createKafkaClient } from "./lib/create-client.mjs";
import { loadConfig, loadSchemaFile } from "./lib/load-config.mjs";
import { createAvroCodecService } from "./services/avro-codec-service.mjs";
import { createRegistryAvroService } from "./services/registry-avro-service.mjs";
import { createSchemaRegistryClient } from "./services/schema-registry-client.mjs";

const config = await loadConfig();
const kafka = createKafkaClient(config);
const admin = kafka.admin();
const producer = kafka.producer();

await admin.connect();
await producer.connect();

const schemaRegistryClient = createSchemaRegistryClient(config);
const avroCodecService = createAvroCodecService({
  schemaRegistryClient
});
const registryAvroService = createRegistryAvroService({
  config,
  admin,
  producer,
  loadSchemaFile,
  schemaRegistryClient,
  avroCodecService
});

await registryAvroService.bootstrapTopic();

const app = createApp({ config, registryAvroService });

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

console.log(`Schema Registry Avro API listening on http://localhost:${config.httpPort}`);

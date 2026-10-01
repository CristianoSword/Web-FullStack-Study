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

console.log(
  JSON.stringify(
    {
      service: config.serviceName,
      topic: config.topic,
      schemaRegistryUrl: config.schemaRegistryUrl,
      httpPort: config.httpPort
    },
    null,
    2
  )
);

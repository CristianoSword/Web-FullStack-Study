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

console.log(
  JSON.stringify(
    {
      service: config.serviceName,
      topic: config.ordersTopic,
      httpPort: config.httpPort
    },
    null,
    2
  )
);

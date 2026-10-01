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

console.log(
  JSON.stringify(
    {
      service: config.serviceName,
      inputTopic: config.inputTopic,
      outputTopic: config.outputTopic,
      httpPort: config.httpPort
    },
    null,
    2
  )
);

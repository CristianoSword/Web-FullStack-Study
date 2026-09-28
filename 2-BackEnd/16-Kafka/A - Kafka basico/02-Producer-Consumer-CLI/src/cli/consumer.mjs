import { createKafkaClient } from "../lib/create-client.mjs";
import { loadConfig } from "../lib/load-config.mjs";

const config = await loadConfig();
const kafka = createKafkaClient(config);
const consumer = kafka.consumer({ groupId: config.consumerGroup });

await consumer.connect();
await consumer.subscribe({ topic: config.topic, fromBeginning: true });

console.log(`Listening on topic ${config.topic} with group ${config.consumerGroup}`);

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const value = message.value ? JSON.parse(message.value.toString()) : null;

    console.log(
      JSON.stringify(
        {
          topic,
          partition,
          offset: message.offset,
          key: message.key?.toString() ?? null,
          value
        },
        null,
        2
      )
    );
  }
});

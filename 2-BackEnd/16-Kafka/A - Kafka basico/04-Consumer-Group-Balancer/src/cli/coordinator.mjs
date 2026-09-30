import { createKafkaClient } from "../lib/create-client.mjs";
import { buildWorkloadMessages } from "../lib/build-workload.mjs";
import { loadConfig } from "../lib/load-config.mjs";

const config = await loadConfig();
const kafka = createKafkaClient(config);
const admin = kafka.admin();
const producer = kafka.producer();

try {
  await admin.connect();
  await admin.createTopics({
    waitForLeaders: true,
    topics: [
      {
        topic: config.topic,
        numPartitions: config.partitions,
        replicationFactor: config.replicationFactor
      }
    ]
  });

  await producer.connect();
  const messages = buildWorkloadMessages(config);

  await producer.send({
    topic: config.topic,
    messages
  });

  console.log(
    JSON.stringify(
      {
        topic: config.topic,
        partitions: config.partitions,
        publishedMessages: messages.length
      },
      null,
      2
    )
  );
} finally {
  await producer.disconnect().catch(() => {});
  await admin.disconnect().catch(() => {});
}

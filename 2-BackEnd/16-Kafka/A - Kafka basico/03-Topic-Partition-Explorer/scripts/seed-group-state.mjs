import { createKafkaClient } from "../src/lib/create-client.mjs";
import { loadConfig } from "../src/lib/load-config.mjs";

function createSeedMessages(topicName) {
  return [
    {
      key: `${topicName}-001`,
      value: JSON.stringify({
        eventId: `${topicName}-001`,
        topic: topicName,
        status: "CREATED",
        emittedAt: new Date().toISOString()
      })
    },
    {
      key: `${topicName}-002`,
      value: JSON.stringify({
        eventId: `${topicName}-002`,
        topic: topicName,
        status: "PROCESSED",
        emittedAt: new Date().toISOString()
      })
    }
  ];
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const config = await loadConfig();
const kafka = createKafkaClient(config);
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: config.sampleConsumerGroup });

const topicNames = config.sampleTopics.map((topic) => topic.name);
const targetMessages = topicNames.length;
const consumedMessages = [];

try {
  await producer.connect();

  for (const topicName of topicNames) {
    await producer.send({
      topic: topicName,
      messages: createSeedMessages(topicName)
    });
  }

  await producer.disconnect();
  await consumer.connect();

  for (const topicName of topicNames) {
    await consumer.subscribe({ topic: topicName, fromBeginning: true });
  }

  let resolveCompletion;
  let rejectCompletion;

  const completion = new Promise((resolve, reject) => {
    resolveCompletion = resolve;
    rejectCompletion = reject;
  });

  const timer = setTimeout(() => {
    rejectCompletion(new Error("Timed out while seeding consumer group state."));
  }, 15000);

  const runPromise = consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      consumedMessages.push({
        topic,
        partition,
        offset: message.offset
      });

      const consumedTopics = new Set(consumedMessages.map((entry) => entry.topic));

      if (consumedTopics.size >= targetMessages) {
        clearTimeout(timer);
        resolveCompletion();
      }
    }
  });

  await completion;
  await consumer.stop();
  await runPromise;
  await wait(500);

  console.log(
    JSON.stringify(
      {
        groupId: config.sampleConsumerGroup,
        consumedMessages
      },
      null,
      2
    )
  );
} finally {
  await producer.disconnect().catch(() => {});
  await consumer.disconnect().catch(() => {});
}


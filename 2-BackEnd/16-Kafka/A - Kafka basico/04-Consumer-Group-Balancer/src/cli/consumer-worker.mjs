import { PartitionAssigners } from "kafkajs";

import { createKafkaClient } from "../lib/create-client.mjs";
import { buildRebalanceEvent } from "../lib/build-workload.mjs";
import { loadConfig } from "../lib/load-config.mjs";

function parseWorkerId(argv, config) {
  const workerId = argv[0] ?? config.workers[0]?.workerId;

  if (!workerId) {
    throw new Error("Usage: node src/cli/consumer-worker.mjs <worker-id>");
  }

  return workerId;
}

const config = await loadConfig();
const workerId = parseWorkerId(process.argv.slice(2), config);
const worker = config.workers.find((entry) => entry.workerId === workerId);

if (!worker) {
  throw new Error(`Worker not configured: ${workerId}`);
}

const kafka = createKafkaClient(config);
const consumer = kafka.consumer({
  groupId: config.consumerGroup,
  partitionAssigners: [PartitionAssigners.roundRobin]
});
let shuttingDown = false;

async function shutdown(reason) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  console.log(
    JSON.stringify(
      buildRebalanceEvent({
        workerId,
        eventType: "STOPPED",
        topic: config.topic,
        partitions: []
      }),
      null,
      2
    )
  );
  console.log(`Stopping ${worker.displayName} due to ${reason}`);

  await consumer.stop().catch(() => {});
  await consumer.disconnect().catch(() => {});
  process.exit(0);
}

consumer.on(consumer.events.REBALANCING, ({ payload }) => {
  console.log(
    JSON.stringify(
      buildRebalanceEvent({
        workerId,
        eventType: "REBALANCING",
        topic: config.topic,
        partitions: []
      }),
      null,
      2
    )
  );
  console.log(`Rebalancing group ${payload.groupId} for ${worker.displayName}`);
});

consumer.on(consumer.events.GROUP_JOIN, ({ payload }) => {
  const assignedPartitions = payload.memberAssignment[config.topic] ?? [];

  console.log(
    JSON.stringify(
      buildRebalanceEvent({
        workerId,
        eventType: "ASSIGNED",
        topic: config.topic,
        partitions: assignedPartitions
      }),
      null,
      2
    )
  );
});

process.once("SIGINT", async () => {
  await shutdown("SIGINT");
});

process.once("SIGTERM", async () => {
  await shutdown("SIGTERM");
});

await consumer.connect();
await consumer.subscribe({ topic: config.topic, fromBeginning: true });

console.log(
  JSON.stringify(
    buildRebalanceEvent({
      workerId,
      eventType: "JOINED",
      topic: config.topic,
      partitions: []
    }),
    null,
    2
  )
);

await consumer.run({
  partitionsConsumedConcurrently: 2,
  eachMessage: async ({ topic, partition, message }) => {
    const payload = JSON.parse(message.value.toString());

    console.log(
      JSON.stringify(
        {
          workerId,
          displayName: worker.displayName,
          topic,
          partition,
          offset: message.offset,
          payload
        },
        null,
        2
      )
    );
  }
});

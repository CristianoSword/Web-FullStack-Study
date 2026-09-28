import { readFile } from "node:fs/promises";

import { createKafkaClient } from "../lib/create-client.mjs";
import { loadConfig, loadJsonFile } from "../lib/load-config.mjs";
import { normalizeEvent } from "../lib/normalize-event.mjs";

const config = await loadConfig();
const kafka = createKafkaClient(config);
const producer = kafka.producer();

const payloadArg = process.argv[2];
const payload = payloadArg
  ? JSON.parse(await readFile(payloadArg, "utf8"))
  : await loadJsonFile("examples/sample-event.json");

const event = normalizeEvent(payload);

await producer.connect();

await producer.send({
  topic: config.topic,
  messages: [
    {
      key: event.eventId,
      value: JSON.stringify(event)
    }
  ]
});

console.log(JSON.stringify({ status: "sent", topic: config.topic, event }, null, 2));

await producer.disconnect();

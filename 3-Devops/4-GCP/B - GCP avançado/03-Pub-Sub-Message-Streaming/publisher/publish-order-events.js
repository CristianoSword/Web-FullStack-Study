import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PubSub } from "@google-cloud/pubsub";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const topicSpec = JSON.parse(fs.readFileSync(path.resolve(root, "config/topic-spec.json"), "utf8"));
const events = JSON.parse(fs.readFileSync(path.resolve(root, "samples/order-events.json"), "utf8"));

const pubsub = new PubSub({ projectId: topicSpec.projectId });
const topic = pubsub.topic(topicSpec.topicName);

for (const event of events) {
  const { attributes, ...payload } = event;
  await topic.publishMessage({
    json: payload,
    attributes
  });
}

console.log(`Published ${events.length} messages to ${topicSpec.topicName}.`);

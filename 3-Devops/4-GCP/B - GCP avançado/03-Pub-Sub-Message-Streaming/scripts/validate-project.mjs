import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/topic-spec.json",
  "config/subscription-spec.json",
  "config/event-schema.json",
  "publisher/publish-order-events.js",
  "subscriber/pull-worker.js",
  "samples/order-events.json",
  "src/main.js",
  "src/test.js",
  "src/models/topic-spec.model.js",
  "src/models/subscription-spec.model.js",
  "src/models/message-envelope.model.js",
  "src/services/pubsub-plan.service.js",
  "src/services/message-schema-summary.service.js",
  "src/services/consumer-runbook.service.js",
  "scripts/check-pubsub-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const publisher = fs.readFileSync(path.resolve(root, "publisher/publish-order-events.js"), "utf8");
for (const token of ['@google-cloud/pubsub', 'publishMessage', 'samples/order-events.json']) {
  if (!publisher.includes(token)) {
    throw new Error(`Publisher missing token: ${token}`);
  }
}

const subscriber = fs.readFileSync(path.resolve(root, "subscriber/pull-worker.js"), "utf8");
for (const token of ['subscription.on("message"', "message.ack()", "message.nack()"]) {
  if (!subscriber.includes(token)) {
    throw new Error(`Subscriber missing token: ${token}`);
  }
}

console.log("Pub/Sub Message Streaming project validation passed.");

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PubSub } from "@google-cloud/pubsub";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const topicSpec = JSON.parse(fs.readFileSync(path.resolve(root, "config/topic-spec.json"), "utf8"));
const subscriptionSpec = JSON.parse(fs.readFileSync(path.resolve(root, "config/subscription-spec.json"), "utf8"));

const pubsub = new PubSub({ projectId: topicSpec.projectId });
const subscription = pubsub.subscription(subscriptionSpec.pullSubscription.name, {
  flowControl: {
    maxMessages: 5
  }
});

function isValidOrderEvent(payload) {
  return Boolean(
    payload.eventId &&
      payload.eventType &&
      payload.order?.id &&
      payload.order?.customerId &&
      typeof payload.order?.amount === "number"
  );
}

subscription.on("message", (message) => {
  try {
    const payload = JSON.parse(message.data.toString("utf8"));

    if (!isValidOrderEvent(payload)) {
      message.nack();
      return;
    }

    console.log(`Processed ${payload.eventType} for order ${payload.order.id}`);
    message.ack();
  } catch (error) {
    console.error("Failed to parse message:", error.message);
    message.nack();
  }
});

subscription.on("error", (error) => {
  console.error("Subscriber error:", error.message);
});

console.log(`Listening on subscription ${subscriptionSpec.pullSubscription.name}.`);

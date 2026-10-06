import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

async function readProjectFile(relativePath) {
  return readFile(path.join(projectRoot, relativePath), "utf8");
}

function assertIncludes(content, snippet, label) {
  if (!content.includes(snippet)) {
    throw new Error(`Missing ${label}: ${snippet}`);
  }
}

const [compose, config, topology, eventSchema, receiptSchema, packageJson, service, routes, playbook] =
  await Promise.all([
    readProjectFile("docker-compose.yml"),
    readProjectFile("config/pubsub-config.json"),
    readProjectFile("topology/definitions.json"),
    readProjectFile("models/broadcast-event.schema.json"),
    readProjectFile("models/subscriber-receipt.schema.json"),
    readProjectFile("package.json"),
    readProjectFile("src/services/pubsub-fanout-service.mjs"),
    readProjectFile("src/routes/pubsub-routes.mjs"),
    readProjectFile("examples/pubsub-playbook.md")
  ]);

assertIncludes(compose, "5674:5672", "amqp port");
assertIncludes(compose, "15674:15672", "management port");
assertIncludes(config, "\"exchange\": \"events.broadcast.fanout\"", "fanout exchange");
assertIncludes(config, "\"events.broadcast.audit\"", "audit subscriber queue");
assertIncludes(topology, "\"type\": \"fanout\"", "fanout topology");
assertIncludes(eventSchema, "\"eventType\"", "broadcast event type");
assertIncludes(receiptSchema, "\"receivedCount\"", "subscriber receipt count");
assertIncludes(packageJson, "\"amqplib\"", "amqplib dependency");
assertIncludes(service, "await setupChannel.assertExchange", "exchange bootstrap");
assertIncludes(service, "await setupChannel.bindQueue(queue.name, topology.exchange.name, \"\")", "fanout queue binding");
assertIncludes(service, "subscriberMessages.push", "subscriber delivery tracking");
assertIncludes(service, "channel.ack(message)", "subscriber ack");
assertIncludes(routes, "/events/publish", "publish route");
assertIncludes(playbook, "list-deliveries.ps1", "delivery playbook");

console.log("PubSub Fanout Exchange structure is valid.");

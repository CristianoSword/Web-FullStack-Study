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

const [compose, config, eventSchema, projectionSchema, packageJson, routes, service, playbook] =
  await Promise.all([
    readProjectFile("docker-compose.yml"),
    readProjectFile("config/orders-config.json"),
    readProjectFile("models/order-event.schema.json"),
    readProjectFile("models/order-projection.schema.json"),
    readProjectFile("package.json"),
    readProjectFile("src/routes/order-routes.mjs"),
    readProjectFile("src/services/event-store-service.mjs"),
    readProjectFile("examples/orders-playbook.md")
  ]);

assertIncludes(compose, "KAFKA_ENABLE_KRAFT", "KRaft mode");
assertIncludes(compose, "54092:9092", "broker port");
assertIncludes(config, "\"ordersTopic\": \"orders.events.v1\"", "orders topic");
assertIncludes(config, "\"consumerGroup\": \"orders-replay-projector\"", "projector group");
assertIncludes(eventSchema, "\"OrderCreated\"", "created event");
assertIncludes(projectionSchema, "\"history\"", "projection history");
assertIncludes(packageJson, "\"fastify\"", "fastify dependency");
assertIncludes(routes, "/orders/:orderId/replay", "replay endpoint");
assertIncludes(routes, "/status", "status endpoint");
assertIncludes(service, "createOrder({ orderId, customerId, totalAmount })", "create order method");
assertIncludes(service, "payOrder({ orderId, paymentId })", "pay order method");
assertIncludes(service, "shipOrder({ orderId, trackingCode })", "ship order method");
assertIncludes(service, "replayOrder(orderId)", "replay method");
assertIncludes(service, "cannot be paid from status", "payment transition guard");
assertIncludes(service, "can only be shipped after payment", "ship transition guard");
assertIncludes(playbook, "replay-order.ps1", "replay playbook");

console.log("Kafka event sourcing orders structure is valid.");

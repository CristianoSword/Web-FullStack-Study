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

const [compose, config, schemaSql, orderSchema, outboxSchema, contractSchema, packageJson, service, repository, routes, playbook] =
  await Promise.all([
    readProjectFile("docker-compose.yml"),
    readProjectFile("config/outbox-config.json"),
    readProjectFile("database/schema.sql"),
    readProjectFile("models/order-record.schema.json"),
    readProjectFile("models/outbox-event.schema.json"),
    readProjectFile("contracts/orders-created.schema.json"),
    readProjectFile("package.json"),
    readProjectFile("src/services/order-outbox-service.mjs"),
    readProjectFile("src/repositories/outbox-repository.mjs"),
    readProjectFile("src/routes/outbox-routes.mjs"),
    readProjectFile("examples/outbox-playbook.md")
  ]);

assertIncludes(compose, "58092:9092", "broker port");
assertIncludes(compose, "bitnami/kafka:3.9", "kafka image");
assertIncludes(config, "\"databasePath\": \"./data/outbox.db\"", "database path");
assertIncludes(config, "\"topic\": \"orders.created.v1\"", "orders topic");
assertIncludes(schemaSql, "CREATE TABLE IF NOT EXISTS outbox_events", "outbox table");
assertIncludes(schemaSql, "idx_outbox_status_created_at", "outbox index");
assertIncludes(orderSchema, "\"PUBLISHED\"", "published order status");
assertIncludes(outboxSchema, "\"FAILED\"", "failed outbox status");
assertIncludes(contractSchema, "\"OrderCreated\"", "event contract");
assertIncludes(packageJson, "\"better-sqlite3\"", "sqlite dependency");
assertIncludes(service, "database.transaction(() => {", "transactional outbox write");
assertIncludes(service, "outboxRepository.insertOutboxEvent(outboxEvent)", "outbox insert");
assertIncludes(service, "producer.send({", "kafka publish");
assertIncludes(service, "outboxRepository.markPublished", "mark published");
assertIncludes(repository, "WHERE status = 'PENDING'", "pending outbox query");
assertIncludes(routes, "/outbox/publish", "publish route");
assertIncludes(playbook, "polling automatico", "polling playbook");

console.log("Microservices Outbox Kafka structure is valid.");

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

const [compose, config, salesSchema, aggregateSchema, packageJson, service, routes, playbook] =
  await Promise.all([
    readProjectFile("docker-compose.yml"),
    readProjectFile("config/aggregator-config.json"),
    readProjectFile("models/sales-event.schema.json"),
    readProjectFile("models/window-aggregate.schema.json"),
    readProjectFile("package.json"),
    readProjectFile("src/services/stream-aggregator-service.mjs"),
    readProjectFile("src/routes/aggregator-routes.mjs"),
    readProjectFile("examples/aggregator-playbook.md")
  ]);

assertIncludes(compose, "KAFKA_ENABLE_KRAFT", "KRaft mode");
assertIncludes(compose, "55092:9092", "broker port");
assertIncludes(config, "\"inputTopic\": \"sales.events.v1\"", "input topic");
assertIncludes(config, "\"outputTopic\": \"sales.aggregates.v1\"", "output topic");
assertIncludes(config, "\"windowSizeMs\": 60000", "window size");
assertIncludes(salesSchema, "\"storeId\"", "sales event store id");
assertIncludes(aggregateSchema, "\"averageAmount\"", "aggregate average");
assertIncludes(packageJson, "\"fastify\"", "fastify dependency");
assertIncludes(service, "applySalesEventToAggregate", "window aggregation");
assertIncludes(service, "consumer.run", "stream consumer");
assertIncludes(service, "publishAggregate", "materialized output publish");
assertIncludes(service, "amount must be a positive number", "amount validation");
assertIncludes(routes, "/sales-events", "sales events endpoint");
assertIncludes(routes, "/aggregates/:storeId", "store aggregate endpoint");
assertIncludes(playbook, "list-store-aggregates.ps1 STORE-001", "playbook store aggregates");

console.log("Kafka streams aggregator structure is valid.");

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

const [compose, topology, orders, payments, inventory, bootstrapScript] = await Promise.all([
  readProjectFile("docker-compose.yml"),
  readProjectFile("config/cluster-topology.json"),
  readProjectFile("topics/orders-events.json"),
  readProjectFile("topics/payments-events.json"),
  readProjectFile("topics/inventory-snapshots.json"),
  readProjectFile("scripts/bootstrap-topics.ps1")
]);

assertIncludes(compose, "KAFKA_ENABLE_KRAFT", "KRaft mode");
assertIncludes(compose, "kafka-1:", "broker service");
assertIncludes(compose, "kafka-2:", "broker service");
assertIncludes(compose, "19092:9092", "broker 1 port");
assertIncludes(compose, "29092:9092", "broker 2 port");
assertIncludes(topology, "\"mode\": \"kraft\"", "topology mode");
assertIncludes(topology, "\"orders.events.v1\"", "orders topic reference");
assertIncludes(orders, "\"replicationFactor\": 2", "orders replication");
assertIncludes(payments, "\"partitions\": 2", "payments partitions");
assertIncludes(inventory, "\"cleanup.policy\": \"compact\"", "inventory compaction");
assertIncludes(bootstrapScript, "kafka-topics.sh", "topic bootstrap command");

console.log("Kafka local cluster structure is valid.");

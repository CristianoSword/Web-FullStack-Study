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

const [compose, config, workerSchema, eventSchema, packageJson, coordinator, worker, playbook] =
  await Promise.all([
    readProjectFile("docker-compose.yml"),
    readProjectFile("config/balancer-config.json"),
    readProjectFile("models/consumer-node.schema.json"),
    readProjectFile("models/rebalance-event.schema.json"),
    readProjectFile("package.json"),
    readProjectFile("src/cli/coordinator.mjs"),
    readProjectFile("src/cli/consumer-worker.mjs"),
    readProjectFile("examples/rebalance-playbook.md")
  ]);

assertIncludes(compose, "KAFKA_ENABLE_KRAFT", "KRaft mode");
assertIncludes(compose, "51092:9092", "broker 1 port");
assertIncludes(compose, "52092:9092", "broker 2 port");
assertIncludes(config, "\"topic\": \"rebalance.workloads.v1\"", "rebalance topic");
assertIncludes(config, "\"consumerGroup\": \"balancer-workers\"", "consumer group");
assertIncludes(config, "\"workerId\": \"worker-a\"", "worker a");
assertIncludes(workerSchema, "\"assignedPartitions\"", "assigned partitions field");
assertIncludes(eventSchema, "\"REBALANCING\"", "rebalance event");
assertIncludes(eventSchema, "\"STOPPED\"", "stop event");
assertIncludes(packageJson, "\"run:consumer:c\"", "consumer c script");
assertIncludes(coordinator, "admin.createTopics", "topic bootstrap");
assertIncludes(coordinator, "producer.send", "workload publishing");
assertIncludes(worker, "PartitionAssigners.roundRobin", "round robin assigner");
assertIncludes(worker, "partitionsConsumedConcurrently: 2", "concurrent consumption");
assertIncludes(worker, "consumer.events.REBALANCING", "rebalance event hook");
assertIncludes(worker, "process.once(\"SIGINT\"", "graceful shutdown");
assertIncludes(playbook, "run-worker-c.ps1", "playbook worker c");

console.log("Kafka consumer group balancer structure is valid.");

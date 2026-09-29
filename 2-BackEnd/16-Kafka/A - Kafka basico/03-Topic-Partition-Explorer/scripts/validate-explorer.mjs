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

const [compose, config, topicSchema, groupSchema, explorer, bootstrap, seed, playbook] = await Promise.all([
  readProjectFile("docker-compose.yml"),
  readProjectFile("config/explorer-config.json"),
  readProjectFile("models/topic-report.schema.json"),
  readProjectFile("models/group-report.schema.json"),
  readProjectFile("src/cli/explorer.mjs"),
  readProjectFile("scripts/bootstrap-lab.ps1"),
  readProjectFile("scripts/seed-group-state.mjs"),
  readProjectFile("examples/explorer-playbook.md")
]);

assertIncludes(compose, "KAFKA_ENABLE_KRAFT", "KRaft mode");
assertIncludes(compose, "49092:9092", "broker port");
assertIncludes(config, "\"orders.events.v1\"", "orders topic");
assertIncludes(config, "\"notifications.events.v1\"", "notifications topic");
assertIncludes(config, "\"sampleConsumerGroup\": \"explorer-audit-group\"", "sample group");
assertIncludes(topicSchema, "\"partitionCount\"", "topic partition count");
assertIncludes(topicSchema, "\"highOffset\"", "topic high offset");
assertIncludes(groupSchema, "\"members\"", "group members");
assertIncludes(groupSchema, "\"lag\"", "group lag field");
assertIncludes(explorer, "admin.listTopics()", "list topics command");
assertIncludes(explorer, "admin.fetchTopicMetadata", "topic metadata inspection");
assertIncludes(explorer, "admin.fetchTopicOffsets", "topic offsets inspection");
assertIncludes(explorer, "admin.listGroups()", "group listing");
assertIncludes(explorer, "admin.describeGroups", "group description");
assertIncludes(explorer, "admin.fetchOffsets", "group offsets");
assertIncludes(bootstrap, "kafka-topics.sh", "topic bootstrap");
assertIncludes(bootstrap, "seed-group-state.mjs", "seed command");
assertIncludes(seed, "consumer.run", "consumer group seeding");
assertIncludes(playbook, "explore-group.ps1", "group playbook");

console.log("Kafka explorer project structure is valid.");

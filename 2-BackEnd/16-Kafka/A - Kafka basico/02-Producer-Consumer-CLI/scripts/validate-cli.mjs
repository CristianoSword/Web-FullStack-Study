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

const [compose, config, schema, producer, consumer, bootstrap] = await Promise.all([
  readProjectFile("docker-compose.yml"),
  readProjectFile("config/topic-config.json"),
  readProjectFile("models/cli-event.schema.json"),
  readProjectFile("src/cli/producer.mjs"),
  readProjectFile("src/cli/consumer.mjs"),
  readProjectFile("scripts/bootstrap-topic.ps1")
]);

assertIncludes(compose, "KAFKA_ENABLE_KRAFT", "KRaft mode");
assertIncludes(compose, "39092:9092", "broker port");
assertIncludes(config, "\"topic\": \"cli.events.v1\"", "topic name");
assertIncludes(config, "\"consumerGroup\": \"cli-events-consumers\"", "consumer group");
assertIncludes(schema, "\"eventType\"", "schema field");
assertIncludes(producer, "producer.send", "producer send");
assertIncludes(producer, "JSON.stringify(event)", "JSON serialization");
assertIncludes(consumer, "consumer.run", "consumer loop");
assertIncludes(consumer, "JSON.parse(message.value.toString())", "JSON deserialization");
assertIncludes(bootstrap, "kafka-topics.sh", "topic bootstrap");

console.log("Kafka CLI project structure is valid.");

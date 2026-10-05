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

const [compose, config, topology, taskSchema, workerSchema, packageJson, service, routes, playbook] =
  await Promise.all([
    readProjectFile("docker-compose.yml"),
    readProjectFile("config/work-queue-config.json"),
    readProjectFile("topology/definitions.json"),
    readProjectFile("models/work-task.schema.json"),
    readProjectFile("models/worker-metric.schema.json"),
    readProjectFile("package.json"),
    readProjectFile("src/services/work-queue-service.mjs"),
    readProjectFile("src/routes/work-queue-routes.mjs"),
    readProjectFile("examples/work-queue-playbook.md")
  ]);

assertIncludes(compose, "5673:5672", "amqp port");
assertIncludes(compose, "15673:15672", "management port");
assertIncludes(config, "\"workerCount\": 3", "worker count");
assertIncludes(config, "\"prefetch\": 1", "prefetch");
assertIncludes(topology, "\"x-dead-letter-exchange\": \"jobs.work.dlx\"", "dead letter exchange");
assertIncludes(taskSchema, "\"attempt\"", "task attempt");
assertIncludes(workerSchema, "\"acked\"", "worker ack metric");
assertIncludes(packageJson, "\"amqplib\"", "amqplib dependency");
assertIncludes(service, "await channel.prefetch(config.prefetch)", "worker prefetch");
assertIncludes(service, "channel.ack(message)", "message ack");
assertIncludes(service, "channel.nack(message, false, false)", "message nack to dlq");
assertIncludes(service, "deadLetterEntries.push", "dead letter tracking");
assertIncludes(routes, "/tasks/dispatch", "dispatch route");
assertIncludes(playbook, "dispatch-failing-task.ps1", "failing task playbook");

console.log("Work Queue Processor structure is valid.");

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

const [compose, config, topology, jobSchema, attemptSchema, packageJson, service, routes, playbook] =
  await Promise.all([
    readProjectFile("docker-compose.yml"),
    readProjectFile("config/retry-config.json"),
    readProjectFile("topology/definitions.json"),
    readProjectFile("models/retry-job.schema.json"),
    readProjectFile("models/retry-attempt.schema.json"),
    readProjectFile("package.json"),
    readProjectFile("src/services/delayed-retry-service.mjs"),
    readProjectFile("src/routes/delayed-retry-routes.mjs"),
    readProjectFile("examples/delayed-retry-playbook.md")
  ]);

assertIncludes(compose, "5677:5672", "amqp port");
assertIncludes(compose, "15677:15672", "management port");
assertIncludes(config, "\"retryDelayMs\": 5000", "retry delay config");
assertIncludes(config, "\"maxAttempts\": 3", "max attempts");
assertIncludes(topology, "\"x-message-ttl\": 5000", "retry ttl queue");
assertIncludes(topology, "\"x-dead-letter-exchange\": \"jobs.retry.main\"", "retry back to main");
assertIncludes(jobSchema, "\"attempt\"", "job attempt");
assertIncludes(attemptSchema, "\"retrying\"", "retry status");
assertIncludes(packageJson, "\"amqplib\"", "amqplib dependency");
assertIncludes(service, "workerChannel.publish(", "retry publish");
assertIncludes(service, "config.retryExchange", "retry exchange");
assertIncludes(service, "config.errorExchange", "error exchange");
assertIncludes(service, "currentAttempt < config.maxAttempts", "retry threshold");
assertIncludes(routes, "/jobs/dead-letter", "dead letter route");
assertIncludes(playbook, "publish-failing-job.ps1", "failing job playbook");

console.log("Delayed Retry DLX structure is valid.");

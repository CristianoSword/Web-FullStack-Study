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

const [compose, config, inputSchema, outputSchema, idempotencySchema, packageJson, client, service, routes, playbook] =
  await Promise.all([
    readProjectFile("docker-compose.yml"),
    readProjectFile("config/pipeline-config.json"),
    readProjectFile("models/pipeline-input.schema.json"),
    readProjectFile("models/pipeline-output.schema.json"),
    readProjectFile("models/idempotency-record.schema.json"),
    readProjectFile("package.json"),
    readProjectFile("src/lib/create-client.mjs"),
    readProjectFile("src/services/exactly-once-service.mjs"),
    readProjectFile("src/routes/pipeline-routes.mjs"),
    readProjectFile("examples/pipeline-playbook.md")
  ]);

assertIncludes(compose, "57092:9092", "broker port");
assertIncludes(compose, "bitnami/kafka:3.9", "kafka image");
assertIncludes(config, "\"transactionalId\": \"payments-tx-producer\"", "transactional id");
assertIncludes(config, "\"deadLetterTopic\": \"payments.dlq.v1\"", "dead letter topic");
assertIncludes(inputSchema, "\"idempotencyKey\"", "input idempotency key");
assertIncludes(outputSchema, "\"DUPLICATE\"", "duplicate status");
assertIncludes(idempotencySchema, "\"processedAt\"", "idempotency processedAt");
assertIncludes(packageJson, "\"fastify\"", "fastify dependency");
assertIncludes(client, "idempotent: true", "idempotent producer");
assertIncludes(client, "transactionalId: config.transactionalId", "transactional producer config");
assertIncludes(service, "await producer.transaction()", "transaction creation");
assertIncludes(service, "idempotencyStore = new Map()", "idempotency store");
assertIncludes(service, "deadLetterTopic", "dead letter routing");
assertIncludes(routes, "/payments/idempotency/:idempotencyKey", "idempotency route");
assertIncludes(playbook, "DUPLICATE", "duplicate replay guidance");

console.log("Exactly Once Pipeline structure is valid.");

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

const [compose, config, topology, requestSchema, responseSchema, packageJson, service, routes, playbook] =
  await Promise.all([
    readProjectFile("docker-compose.yml"),
    readProjectFile("config/rpc-config.json"),
    readProjectFile("topology/definitions.json"),
    readProjectFile("models/rpc-request.schema.json"),
    readProjectFile("models/rpc-response.schema.json"),
    readProjectFile("package.json"),
    readProjectFile("src/services/rpc-request-reply-service.mjs"),
    readProjectFile("src/routes/rpc-routes.mjs"),
    readProjectFile("examples/rpc-playbook.md")
  ]);

assertIncludes(compose, "5676:5672", "amqp port");
assertIncludes(compose, "15676:15672", "management port");
assertIncludes(config, "\"requestQueue\": \"rpc.calc.requests\"", "request queue");
assertIncludes(config, "\"replyQueue\": \"rpc.calc.replies\"", "reply queue");
assertIncludes(config, "\"timeoutMs\": 2500", "timeout config");
assertIncludes(topology, "\"rpc.calc.requests\"", "request queue topology");
assertIncludes(requestSchema, "\"operation\"", "rpc operation");
assertIncludes(responseSchema, "\"correlationId\"", "response correlation id");
assertIncludes(packageJson, "\"amqplib\"", "amqplib dependency");
assertIncludes(service, "message.properties.correlationId", "rpc correlation id");
assertIncludes(service, "replyTo: config.replyQueue", "reply queue publish");
assertIncludes(service, "setTimeout(() => {", "timeout handling");
assertIncludes(service, "workerChannel.sendToQueue(", "rpc reply send");
assertIncludes(routes, "/rpc/call", "rpc call route");
assertIncludes(playbook, "call-multiply.ps1", "multiply playbook");

console.log("RPC Request Reply structure is valid.");

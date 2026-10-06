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

const [compose, config, topology, logSchema, bindingSchema, packageJson, service, routes, playbook] =
  await Promise.all([
    readProjectFile("docker-compose.yml"),
    readProjectFile("config/direct-routing-config.json"),
    readProjectFile("topology/definitions.json"),
    readProjectFile("models/routed-log.schema.json"),
    readProjectFile("models/routing-binding.schema.json"),
    readProjectFile("package.json"),
    readProjectFile("src/services/direct-routing-service.mjs"),
    readProjectFile("src/routes/direct-routing-routes.mjs"),
    readProjectFile("examples/direct-routing-playbook.md")
  ]);

assertIncludes(compose, "5675:5672", "amqp port");
assertIncludes(compose, "15675:15672", "management port");
assertIncludes(config, "\"exchange\": \"logs.direct.exchange\"", "direct exchange");
assertIncludes(topology, "\"type\": \"direct\"", "direct topology");
assertIncludes(topology, "\"routingKey\": \"error\"", "error binding key");
assertIncludes(logSchema, "\"severity\"", "log severity");
assertIncludes(bindingSchema, "\"routingKey\"", "binding routing key");
assertIncludes(packageJson, "\"amqplib\"", "amqplib dependency");
assertIncludes(service, "await setupChannel.bindQueue(", "queue binding");
assertIncludes(service, "topology.exchange.name,", "exchange publish target");
assertIncludes(service, "log.severity,", "severity routing");
assertIncludes(service, "channel.ack(message)", "consumer ack");
assertIncludes(routes, "/logs/publish", "publish route");
assertIncludes(playbook, "publish-error-log.ps1", "error playbook");

console.log("Routing Direct Exchange structure is valid.");

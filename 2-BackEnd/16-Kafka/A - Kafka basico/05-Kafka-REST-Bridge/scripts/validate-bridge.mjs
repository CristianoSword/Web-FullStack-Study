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

const [compose, config, publishSchema, statusSchema, packageJson, app, routes, service, playbook] =
  await Promise.all([
    readProjectFile("docker-compose.yml"),
    readProjectFile("config/bridge-config.json"),
    readProjectFile("models/publish-event.schema.json"),
    readProjectFile("models/status-response.schema.json"),
    readProjectFile("package.json"),
    readProjectFile("src/app.mjs"),
    readProjectFile("src/routes/bridge-routes.mjs"),
    readProjectFile("src/services/bridge-service.mjs"),
    readProjectFile("examples/bridge-playbook.md")
  ]);

assertIncludes(compose, "KAFKA_ENABLE_KRAFT", "KRaft mode");
assertIncludes(compose, "53092:9092", "broker port");
assertIncludes(config, "\"topic\": \"bridge.events.v1\"", "bridge topic");
assertIncludes(config, "\"httpPort\": 4310", "http port");
assertIncludes(publishSchema, "\"eventType\"", "publish event type");
assertIncludes(statusSchema, "\"recentEvents\"", "status recent events");
assertIncludes(packageJson, "\"fastify\"", "fastify dependency");
assertIncludes(app, "app.register(registerBridgeRoutes)", "route registration");
assertIncludes(routes, "app.post(", "post route");
assertIncludes(routes, "/events", "events endpoint");
assertIncludes(routes, "/status", "status endpoint");
assertIncludes(service, "producer.send", "Kafka publish");
assertIncludes(service, "out of range", "partition guard");
assertIncludes(playbook, "publish-sample.ps1", "playbook publish sample");

console.log("Kafka REST bridge structure is valid.");

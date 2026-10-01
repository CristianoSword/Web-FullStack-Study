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

const [compose, config, schemaV1, schemaV2, payloadSchema, packageJson, registryClient, avroCodec, routes, playbook] =
  await Promise.all([
    readProjectFile("docker-compose.yml"),
    readProjectFile("config/registry-config.json"),
    readProjectFile("schemas/customer-event-v1.avsc"),
    readProjectFile("schemas/customer-event-v2.avsc"),
    readProjectFile("models/avro-payload.schema.json"),
    readProjectFile("package.json"),
    readProjectFile("src/services/schema-registry-client.mjs"),
    readProjectFile("src/services/avro-codec-service.mjs"),
    readProjectFile("src/routes/registry-routes.mjs"),
    readProjectFile("examples/registry-playbook.md")
  ]);

assertIncludes(compose, "cp-schema-registry", "schema registry service");
assertIncludes(compose, "56092:9092", "broker port");
assertIncludes(compose, "58081:8081", "schema registry port");
assertIncludes(config, "\"subject\": \"customer.events.avro.v1-value\"", "subject name");
assertIncludes(config, "\"compatibility\": \"BACKWARD\"", "compatibility mode");
assertIncludes(schemaV1, "\"name\": \"CustomerEvent\"", "v1 avro record");
assertIncludes(schemaV2, "\"segment\"", "v2 optional field");
assertIncludes(payloadSchema, "\"customerId\"", "payload customer id");
assertIncludes(packageJson, "\"avsc\"", "avsc dependency");
assertIncludes(registryClient, "/subjects/${subject}/versions", "register schema endpoint");
assertIncludes(registryClient, "/compatibility/subjects/${subject}/versions/latest", "compatibility endpoint");
assertIncludes(avroCodec, "MAGIC_BYTE", "confluent wire format");
assertIncludes(routes, "/schemas/register", "register route");
assertIncludes(routes, "/events/avro/decode-latest", "decode route");
assertIncludes(playbook, "check-v2-compatibility.ps1", "compatibility playbook");

console.log("Schema Registry Avro structure is valid.");

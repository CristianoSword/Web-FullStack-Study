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

const [compose, config, topology, messageSchema, receiptSchema, packageJson, service, routes, playbook] =
  await Promise.all([
    readProjectFile("docker-compose.yml"),
    readProjectFile("config/rabbitmq-config.json"),
    readProjectFile("topology/definitions.json"),
    readProjectFile("models/broker-message.schema.json"),
    readProjectFile("models/consumer-receipt.schema.json"),
    readProjectFile("package.json"),
    readProjectFile("src/services/rabbitmq-broker-service.mjs"),
    readProjectFile("src/routes/broker-routes.mjs"),
    readProjectFile("examples/broker-playbook.md")
  ]);

assertIncludes(compose, "rabbitmq:3.13-management", "rabbitmq image");
assertIncludes(compose, "15672:15672", "management port");
assertIncludes(config, "\"deadLetterQueue\": \"app.events.dlq\"", "dead letter queue");
assertIncludes(topology, "\"x-dead-letter-exchange\": \"app.events.dlx\"", "dlx topology");
assertIncludes(messageSchema, "\"payload\"", "message payload");
assertIncludes(receiptSchema, "\"ackedMessages\"", "consumer receipt");
assertIncludes(packageJson, "\"amqplib\"", "amqplib dependency");
assertIncludes(service, "await channel.assertExchange", "exchange bootstrap");
assertIncludes(service, "await channel.assertQueue", "queue bootstrap");
assertIncludes(service, "channel.ack(message)", "acknowledgement");
assertIncludes(service, "deadLetterMessages.push", "dlq tracking");
assertIncludes(routes, "/messages/dead-letter", "dead letter route");
assertIncludes(playbook, "list-dlq.ps1", "playbook dlq step");

console.log("RabbitMQ Local Broker structure is valid.");

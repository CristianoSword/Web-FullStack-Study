import fs from "node:fs";
import path from "node:path";

const requiredFiles = [
  "package.json",
  "docker-compose.yml",
  "config/runtime-config.mjs",
  "config/rabbitmq-1/rabbitmq.conf",
  "config/rabbitmq-2/rabbitmq.conf",
  "config/rabbitmq-3/rabbitmq.conf",
  "models/cluster-node.mjs",
  "models/quorum-message.mjs",
  "models/ha-policy.mjs",
  "src/server.mjs"
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.resolve(file)));

if (missing.length > 0) {
  console.error("Missing files:", missing.join(", "));
  process.exit(1);
}

console.log("Cluster scaffold looks consistent.");

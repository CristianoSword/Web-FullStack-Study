import fs from "node:fs";
import path from "node:path";

const requiredFiles = [
  "package.json",
  "docker-compose.yml",
  "prometheus/prometheus.yml",
  "prometheus/alert-rules.yml",
  "src/server.mjs",
  "models/trace-context.mjs",
  "models/message-envelope.mjs",
  "models/metrics-store.mjs"
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.resolve(file)));

if (missing.length > 0) {
  console.error("Missing files:", missing.join(", "));
  process.exit(1);
}

console.log("Observability scaffold looks consistent.");

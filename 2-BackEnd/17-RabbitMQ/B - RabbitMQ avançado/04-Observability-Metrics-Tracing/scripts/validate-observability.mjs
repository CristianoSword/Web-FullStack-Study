import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

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

const syntaxTargets = [
  "config/runtime-config.mjs",
  "models/trace-context.mjs",
  "models/message-envelope.mjs",
  "models/metrics-store.mjs",
  "src/server.mjs",
  "src/lib/rabbitmq-connection.mjs",
  "src/services/observability-service.mjs",
  "src/routes/health-routes.mjs",
  "src/routes/observability-routes.mjs",
  "topology/observability-topology.mjs"
];

for (const target of syntaxTargets) {
  execFileSync(process.execPath, ["--check", target], { stdio: "pipe" });
}

console.log("Observability scaffold looks consistent.");

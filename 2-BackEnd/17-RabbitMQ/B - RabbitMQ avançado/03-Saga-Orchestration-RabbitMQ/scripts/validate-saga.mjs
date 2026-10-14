import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const requiredFiles = [
  "package.json",
  "docker-compose.yml",
  "config/runtime-config.mjs",
  "src/server.mjs",
  "models/order-request.mjs",
  "models/saga-state.mjs",
  "models/saga-events.mjs"
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.resolve(file)));

if (missing.length > 0) {
  console.error("Missing files:", missing.join(", "));
  process.exit(1);
}

const syntaxTargets = [
  "config/runtime-config.mjs",
  "models/order-request.mjs",
  "models/saga-state.mjs",
  "models/saga-events.mjs",
  "src/server.mjs",
  "src/lib/rabbitmq-connection.mjs",
  "src/services/saga-store.mjs",
  "src/services/order-saga-orchestrator.mjs",
  "src/services/simulated-domain-services.mjs",
  "src/routes/health-routes.mjs",
  "src/routes/saga-routes.mjs",
  "topology/saga-topology.mjs"
];

for (const target of syntaxTargets) {
  execFileSync(process.execPath, ["--check", target], { stdio: "pipe" });
}

console.log("Saga scaffold looks consistent.");

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const requiredFiles = [
  "package.json",
  "docker-compose.yml",
  "config/runtime-config.mjs",
  "src/server.mjs",
  "models/job-definition.mjs",
  "models/scheduler-state.mjs",
  "models/worker-load-policy.mjs"
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.resolve(file)));

if (missing.length > 0) {
  console.error("Missing files:", missing.join(", "));
  process.exit(1);
}

const composeFile = fs.readFileSync(path.resolve("docker-compose.yml"), "utf8");
if (!composeFile.includes("rabbitmq:3.13-management")) {
  console.error("docker-compose.yml is missing the expected RabbitMQ image.");
  process.exit(1);
}

const syntaxTargets = [
  "config/runtime-config.mjs",
  "models/job-definition.mjs",
  "models/scheduler-state.mjs",
  "models/worker-load-policy.mjs",
  "src/server.mjs",
  "src/lib/rabbitmq-connection.mjs",
  "src/services/scheduler-store.mjs",
  "src/services/job-scheduler-service.mjs",
  "src/services/priority-worker-service.mjs",
  "src/routes/health-routes.mjs",
  "src/routes/scheduler-routes.mjs",
  "topology/priority-topology.mjs"
];

for (const target of syntaxTargets) {
  execFileSync(process.execPath, ["--check", target], { stdio: "pipe" });
}

console.log("Priority scheduler scaffold looks consistent.");

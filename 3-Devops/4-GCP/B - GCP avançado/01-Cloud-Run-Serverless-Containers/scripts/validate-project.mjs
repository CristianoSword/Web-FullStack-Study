import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/service-spec.json",
  "config/env-vars.json",
  "app/package.json",
  "app/server.js",
  "Dockerfile",
  "cloudrun/service.yaml",
  "src/main.js",
  "src/test.js",
  "src/models/cloud-run-spec.model.js",
  "src/models/env-var.model.js",
  "src/models/rollout-step.model.js",
  "src/services/cloud-run-plan.service.js",
  "src/services/service-yaml-summary.service.js",
  "src/services/rollout-plan.service.js",
  "scripts/check-cloud-run.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const yaml = fs.readFileSync(path.resolve(root, "cloudrun/service.yaml"), "utf8");
for (const token of ["kind: Service", "containerConcurrency: 40", "autoscaling.knative.dev/maxScale: \"5\""]) {
  if (!yaml.includes(token)) {
    throw new Error(`Cloud Run YAML missing token: ${token}`);
  }
}

console.log("Cloud Run Serverless Containers project validation passed.");

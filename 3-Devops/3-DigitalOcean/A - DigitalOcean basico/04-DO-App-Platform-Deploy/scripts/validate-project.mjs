import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/env-vars.json",
  "config/domains.json",
  "app-spec.yaml",
  "app/package.json",
  "app/server.js",
  "src/main.js",
  "src/test.js",
  "src/models/app-component.model.js",
  "src/models/app-domain.model.js",
  "src/models/deployment-step.model.js",
  "src/services/app-platform-plan.service.js",
  "src/services/app-spec-summary.service.js",
  "src/services/deployment-rollout.service.js",
  "scripts/check-app-platform.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const appSpec = fs.readFileSync(path.resolve(root, "app-spec.yaml"), "utf8");
for (const token of ["services:", "environment_slug: node-js", "health_check:", "deploy_on_push: true"]) {
  if (!appSpec.includes(token)) {
    throw new Error(`App spec missing token: ${token}`);
  }
}

console.log("DO App Platform Deploy project validation passed.");

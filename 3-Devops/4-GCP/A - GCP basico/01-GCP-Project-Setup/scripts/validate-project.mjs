import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/project-spec.json",
  "config/enabled-apis.json",
  "config/service-account.json",
  "src/main.js",
  "src/test.js",
  "src/models/api-enablement.model.js",
  "src/models/project-spec.model.js",
  "src/models/service-account.model.js",
  "src/services/project-plan.service.js",
  "src/services/api-plan.service.js",
  "src/services/identity-plan.service.js",
  "scripts/check-gcp-project.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const apis = JSON.parse(fs.readFileSync(path.resolve(root, "config/enabled-apis.json"), "utf8"));
if (!apis.includes("compute.googleapis.com")) {
  throw new Error("Enabled APIs must include compute.googleapis.com");
}

console.log("GCP Project Setup project validation passed.");

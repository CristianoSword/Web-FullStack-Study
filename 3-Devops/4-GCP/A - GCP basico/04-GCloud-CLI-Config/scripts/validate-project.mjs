import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/cli-profile.json",
  "config/adc-profile.json",
  "config/smoke-commands.json",
  "src/main.js",
  "src/test.js",
  "src/models/cli-profile.model.js",
  "src/models/adc-profile.model.js",
  "src/models/smoke-command.model.js",
  "src/services/cli-config-plan.service.js",
  "src/services/auth-plan.service.js",
  "src/services/defaults-plan.service.js",
  "scripts/check-gcloud-config.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const smoke = JSON.parse(fs.readFileSync(path.resolve(root, "config/smoke-commands.json"), "utf8"));
if (!smoke.includes("gcloud auth list")) {
  throw new Error("Smoke commands must include gcloud auth list.");
}

console.log("GCloud CLI Config project validation passed.");

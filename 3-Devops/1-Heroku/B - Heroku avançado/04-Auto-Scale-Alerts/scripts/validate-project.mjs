import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/sample-metrics.json",
  "config/alert-channels.json",
  "src/main.js",
  "src/test.js",
  "src/models/alert-rule.model.js",
  "src/models/autoscale-plan.model.js",
  "src/services/alert-rules.service.js",
  "src/services/autoscale-plan.service.js",
  "src/services/incident-brief.service.js",
  "scripts/check-autoscale-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const mainCode = fs.readFileSync(path.resolve(root, "src/main.js"), "utf8");
for (const branch of ["plan", "alerts", "incident"]) {
  if (!mainCode.includes(branch)) {
    throw new Error(`Missing CLI branch: ${branch}`);
  }
}

console.log("Heroku auto scale alerts project validation passed.");

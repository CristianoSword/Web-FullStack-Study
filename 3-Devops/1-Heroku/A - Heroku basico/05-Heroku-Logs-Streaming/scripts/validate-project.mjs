import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/sample-log-lines.json",
  "src/main.js",
  "src/test.js",
  "src/models/log-plan.model.js",
  "src/models/parsed-log-entry.model.js",
  "src/services/log-plan.service.js",
  "src/services/log-sample-parser.service.js",
  "src/services/incident-brief.service.js",
  "scripts/check-logs-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const mainCode = fs.readFileSync(path.resolve(root, "src/main.js"), "utf8");
for (const branch of ["plan", "sample", "incident"]) {
  if (!mainCode.includes(branch)) {
    throw new Error(`Missing CLI branch: ${branch}`);
  }
}

console.log("Heroku logs streaming project validation passed.");

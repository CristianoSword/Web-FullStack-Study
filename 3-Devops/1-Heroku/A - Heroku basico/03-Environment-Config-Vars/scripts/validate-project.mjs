import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/staging-vars.json",
  "config/production-vars.json",
  "src/main.js",
  "src/test.js",
  "src/models/config-var.model.js",
  "src/models/env-diff.model.js",
  "src/services/config-var-plan.service.js",
  "src/services/env-diff.service.js",
  "scripts/check-config-vars-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const mainCode = fs.readFileSync(path.resolve(root, "src/main.js"), "utf8");
for (const branch of ["plan", "diff"]) {
  if (!mainCode.includes(branch)) {
    throw new Error(`CLI branch missing: ${branch}`);
  }
}

console.log("Environment config vars project validation passed.");

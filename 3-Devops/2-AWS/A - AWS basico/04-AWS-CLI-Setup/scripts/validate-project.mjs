import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/profile-template.json",
  "templates/config.ini",
  "templates/credentials.ini",
  "src/main.js",
  "src/test.js",
  "src/models/aws-cli-plan.model.js",
  "src/models/profile-summary.model.js",
  "src/services/aws-cli-plan.service.js",
  "src/services/profile-summary.service.js",
  "src/services/smoke-check.service.js",
  "scripts/check-aws-cli-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const mainCode = fs.readFileSync(path.resolve(root, "src/main.js"), "utf8");
for (const branch of ["plan", "profile", "smoke"]) {
  if (!mainCode.includes(branch)) {
    throw new Error(`Missing CLI branch: ${branch}`);
  }
}

console.log("AWS CLI setup project validation passed.");

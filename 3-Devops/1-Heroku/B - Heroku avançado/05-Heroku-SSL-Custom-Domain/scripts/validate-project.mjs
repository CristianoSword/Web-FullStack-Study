import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/dns-records.json",
  "config/ssl-checklist.json",
  "src/main.js",
  "src/test.js",
  "src/models/domain-plan.model.js",
  "src/models/ssl-plan.model.js",
  "src/services/domain-plan.service.js",
  "src/services/dns-records.service.js",
  "src/services/ssl-plan.service.js",
  "scripts/check-domain-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const mainCode = fs.readFileSync(path.resolve(root, "src/main.js"), "utf8");
for (const branch of ["plan", "dns", "ssl"]) {
  if (!mainCode.includes(branch)) {
    throw new Error(`Missing CLI branch: ${branch}`);
  }
}

console.log("Heroku SSL custom domain project validation passed.");

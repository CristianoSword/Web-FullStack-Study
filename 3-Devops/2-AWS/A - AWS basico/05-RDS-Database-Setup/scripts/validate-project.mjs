import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/networking.json",
  "config/parameter-template.json",
  "sql/001_create_accounts.sql",
  "sql/002_seed_accounts.sql",
  "src/main.js",
  "src/test.js",
  "src/models/rds-plan.model.js",
  "src/models/rds-connection.model.js",
  "src/services/rds-plan.service.js",
  "src/services/rds-connection.service.js",
  "src/services/schema-summary.service.js",
  "scripts/check-rds-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const mainCode = fs.readFileSync(path.resolve(root, "src/main.js"), "utf8");
for (const branch of ["plan", "connection", "schema"]) {
  if (!mainCode.includes(branch)) {
    throw new Error(`Missing CLI branch: ${branch}`);
  }
}

console.log("RDS database setup project validation passed.");

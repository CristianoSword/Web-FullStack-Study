import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/connection-sample.json",
  "sql/001_create_sessions.sql",
  "sql/002_seed_sessions.sql",
  "src/main.js",
  "src/test.js",
  "src/models/addon-plan.model.js",
  "src/models/database-url.model.js",
  "src/services/addon-plan.service.js",
  "src/services/database-url-inspector.service.js",
  "src/services/schema-summary.service.js",
  "scripts/check-addon-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const mainCode = fs.readFileSync(path.resolve(root, "src/main.js"), "utf8");
for (const branch of ["plan", "inspect-url", "schema"]) {
  if (!mainCode.includes(branch)) {
    throw new Error(`Main CLI branch missing: ${branch}`);
  }
}

console.log("Heroku addon database project validation passed.");

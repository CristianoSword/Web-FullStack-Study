import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/instance-spec.json",
  "config/database-users.json",
  "config/authorized-networks.json",
  "sql/001_create_schema.sql",
  "sql/002_seed_accounts.sql",
  "src/main.js",
  "src/test.js",
  "src/models/authorized-network.model.js",
  "src/models/sql-instance-spec.model.js",
  "src/models/sql-user.model.js",
  "src/services/cloud-sql-plan.service.js",
  "src/services/connection-plan.service.js",
  "src/services/bootstrap-summary.service.js",
  "scripts/check-cloud-sql.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const bootstrap = fs.readFileSync(path.resolve(root, "sql/001_create_schema.sql"), "utf8");
if (!bootstrap.includes("create table if not exists accounts")) {
  throw new Error("Bootstrap SQL must create accounts table.");
}

console.log("Cloud SQL Instance project validation passed.");

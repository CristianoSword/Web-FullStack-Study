import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/cluster-spec.json",
  "config/trusted-sources.json",
  "config/database-users.json",
  "sql/001_create_schema.sql",
  "sql/002_seed_accounts.sql",
  "src/main.js",
  "src/test.js",
  "src/models/cluster-spec.model.js",
  "src/models/db-user.model.js",
  "src/models/failover-step.model.js",
  "src/services/cluster-plan.service.js",
  "src/services/connection-plan.service.js",
  "src/services/failover-runbook.service.js",
  "scripts/check-managed-db.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const sql = fs.readFileSync(path.resolve(root, "sql/001_create_schema.sql"), "utf8");
if (!sql.includes("create table if not exists core.accounts")) {
  throw new Error("Bootstrap SQL must create core.accounts table.");
}

console.log("Managed Database Cluster project validation passed.");

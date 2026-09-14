import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const catalog = JSON.parse(fs.readFileSync(path.join(projectRoot, "models", "query-catalog.json"), "utf8"));
const schema = JSON.parse(fs.readFileSync(path.join(projectRoot, "models", "order.schema.json"), "utf8"));
const queryScript = fs.readFileSync(path.join(projectRoot, "queries", "comparison.mongodb.js"), "utf8");
const seedScript = fs.readFileSync(path.join(projectRoot, "seed", "01-init.js"), "utf8");

const failures = [];

if (catalog.database !== "sales_analytics") {
  failures.push(`Unexpected database name: ${catalog.database}`);
}

for (const operator of catalog.operatorsCovered) {
  if (!queryScript.includes(operator)) {
    failures.push(`Query script does not include operator ${operator}.`);
  }
}

for (const requiredField of schema.$jsonSchema.required) {
  if (!seedScript.includes(requiredField)) {
    failures.push(`Seed script is missing required field ${requiredField}.`);
  }
}

if (!queryScript.includes("amount") || !queryScript.includes("region") || !queryScript.includes("status")) {
  failures.push("Query script must compare amount, region and status.");
}

if (failures.length > 0) {
  console.error("Filter validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Filter validation passed.");

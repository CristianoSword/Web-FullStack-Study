import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const catalog = JSON.parse(fs.readFileSync(path.join(projectRoot, "models", "index-catalog.json"), "utf8"));
const schema = JSON.parse(fs.readFileSync(path.join(projectRoot, "models", "supplier.schema.json"), "utf8"));
const seedScript = fs.readFileSync(path.join(projectRoot, "seed", "01-init.js"), "utf8");
const indexScript = fs.readFileSync(path.join(projectRoot, "queries", "indexes.mongodb.js"), "utf8");
const duplicateScript = fs.readFileSync(path.join(projectRoot, "queries", "duplicate-check.mongodb.js"), "utf8");

const failures = [];

if (catalog.database !== "inventory_catalog") {
  failures.push(`Unexpected database name: ${catalog.database}`);
}

for (const index of catalog.indexesPlanned) {
  if (!seedScript.includes(index.name)) {
    failures.push(`Seed script does not create index ${index.name}.`);
  }
}

for (const requiredField of schema.$jsonSchema.required) {
  if (!seedScript.includes(requiredField)) {
    failures.push(`Seed script is missing required field ${requiredField}.`);
  }
}

if (!indexScript.includes("getIndexes") || !indexScript.includes("explain(\"executionStats\")")) {
  failures.push("Index query script must inspect indexes and explain execution stats.");
}

for (const uniqueField of ["supplierCode", "email"]) {
  if (!duplicateScript.includes(uniqueField)) {
    failures.push(`Duplicate check script must cover unique field ${uniqueField}.`);
  }
}

if (failures.length > 0) {
  console.error("Index validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Index validation passed.");

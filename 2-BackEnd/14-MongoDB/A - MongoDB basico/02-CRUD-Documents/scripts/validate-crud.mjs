import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const schema = JSON.parse(fs.readFileSync(path.join(projectRoot, "models", "customer.schema.json"), "utf8"));
const collectionMap = JSON.parse(fs.readFileSync(path.join(projectRoot, "models", "collection-map.json"), "utf8"));
const seedScript = fs.readFileSync(path.join(projectRoot, "seed", "01-init.js"), "utf8");
const crudScript = fs.readFileSync(path.join(projectRoot, "queries", "crud.mongodb.js"), "utf8");

const failures = [];

if (collectionMap.database !== "customer_crm") {
  failures.push(`Unexpected database name: ${collectionMap.database}`);
}

for (const field of schema.$jsonSchema.required) {
  if (!seedScript.includes(field) && !crudScript.includes(field)) {
    failures.push(`Field ${field} is not represented in seed or CRUD scripts.`);
  }
}

for (const operation of ["insertOne", "find(", "updateOne", "deleteOne"]) {
  if (!crudScript.includes(operation)) {
    failures.push(`CRUD script is missing operation ${operation}.`);
  }
}

if (failures.length > 0) {
  console.error("CRUD validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("CRUD validation passed.");

import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const catalog = JSON.parse(fs.readFileSync(path.join(projectRoot, "models", "update-catalog.json"), "utf8"));
const schema = JSON.parse(fs.readFileSync(path.join(projectRoot, "models", "project.schema.json"), "utf8"));
const seedScript = fs.readFileSync(path.join(projectRoot, "seed", "01-init.js"), "utf8");
const updateScript = fs.readFileSync(path.join(projectRoot, "queries", "update-operators.mongodb.js"), "utf8");

const failures = [];

if (catalog.database !== "project_tracker") {
  failures.push(`Unexpected database name: ${catalog.database}`);
}

for (const operator of catalog.operatorsCovered) {
  if (!updateScript.includes(operator)) {
    failures.push(`Update script does not include operator ${operator}.`);
  }
}

for (const requiredField of schema.$jsonSchema.required) {
  if (!seedScript.includes(requiredField)) {
    failures.push(`Seed script is missing required field ${requiredField}.`);
  }
}

for (const pathSnippet of ["labels", "members", "tasks.$.checkpoints", "members.0.role"]) {
  if (!updateScript.includes(pathSnippet)) {
    failures.push(`Update script is missing path ${pathSnippet}.`);
  }
}

if (failures.length > 0) {
  console.error("Update validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Update validation passed.");

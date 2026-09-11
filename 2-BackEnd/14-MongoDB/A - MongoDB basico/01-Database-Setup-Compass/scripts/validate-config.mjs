import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const manifestPath = path.join(projectRoot, "models", "collections.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const failures = [];

if (manifest.database !== "study_inventory") {
  failures.push(`Unexpected database name: ${manifest.database}`);
}

for (const collection of manifest.collections) {
  const validatorPath = path.resolve(path.dirname(manifestPath), collection.validator);
  if (!fs.existsSync(validatorPath)) {
    failures.push(`Missing validator file for ${collection.name}: ${validatorPath}`);
    continue;
  }

  const validator = JSON.parse(fs.readFileSync(validatorPath, "utf8"));
  const required = validator?.$jsonSchema?.required;
  if (!Array.isArray(required) || required.length === 0) {
    failures.push(`Validator for ${collection.name} has no required fields.`);
  }
}

const composePath = path.join(projectRoot, "docker-compose.yml");
const composeContent = fs.readFileSync(composePath, "utf8");
if (!composeContent.includes("mongo:8.0")) {
  failures.push("docker-compose.yml must target mongo:8.0");
}
if (!composeContent.includes("/docker-entrypoint-initdb.d")) {
  failures.push("docker-compose.yml must mount init scripts.");
}

const initPath = path.join(projectRoot, "init", "01-bootstrap.js");
const initContent = fs.readFileSync(initPath, "utf8");
for (const collection of manifest.collections) {
  if (!initContent.includes(`"${collection.name}"`)) {
    failures.push(`Init script does not reference collection ${collection.name}.`);
  }
}

if (failures.length > 0) {
  console.error("Configuration validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Configuration validation passed.");

import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const catalog = JSON.parse(fs.readFileSync(path.join(projectRoot, "models", "pipeline-catalog.json"), "utf8"));
const seedScript = fs.readFileSync(path.join(projectRoot, "seed", "01-init.js"), "utf8");
const failures = [];

if (catalog.database !== "analytics_lab") {
  failures.push(`Unexpected database name: ${catalog.database}`);
}

for (const pipeline of catalog.pipelines) {
  const pipelinePath = path.join(projectRoot, "queries", `${pipeline.name}.mongodb.js`);
  if (!fs.existsSync(pipelinePath)) {
    failures.push(`Missing pipeline file: ${pipelinePath}`);
    continue;
  }
  const pipelineContent = fs.readFileSync(pipelinePath, "utf8");
  for (const stage of pipeline.stages) {
    if (!pipelineContent.includes(stage)) {
      failures.push(`Pipeline ${pipeline.name} is missing stage ${stage}.`);
    }
  }
}

for (const field of ["saleId", "region", "channel", "seller", "status", "revenue", "items", "createdAt"]) {
  if (!seedScript.includes(field)) {
    failures.push(`Seed script is missing field ${field}.`);
  }
}

if (failures.length > 0) {
  console.error("Aggregation validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Aggregation validation passed.");

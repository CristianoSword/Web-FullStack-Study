import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/review-app-template.json",
  "pipeline-stage-map.json",
  "src/main.js",
  "src/test.js",
  "src/models/pipeline-plan.model.js",
  "src/models/review-app.model.js",
  "src/services/pipeline-plan.service.js",
  "src/services/review-app-plan.service.js",
  "src/services/promotion-flow.service.js",
  "scripts/check-pipeline-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const mainCode = fs.readFileSync(path.resolve(root, "src/main.js"), "utf8");
for (const branch of ["plan", "review", "promotion"]) {
  if (!mainCode.includes(branch)) {
    throw new Error(`Missing CLI branch: ${branch}`);
  }
}

console.log("Heroku pipelines CI/CD project validation passed.");

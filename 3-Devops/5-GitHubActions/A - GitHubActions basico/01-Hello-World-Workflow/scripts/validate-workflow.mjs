import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  ".github/workflows/hello-world.yml",
  "config/workflow-spec.json",
  "scripts/render-greeting.mjs",
  "src/main.js",
  "src/test.js",
  "src/models/workflow-trigger.model.js",
  "src/models/greeting-context.model.js",
  "src/services/hello-workflow-plan.service.js",
  "src/services/summary-template.service.js"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const workflow = fs.readFileSync(path.resolve(root, ".github/workflows/hello-world.yml"), "utf8");
for (const token of ["workflow_dispatch:", "actions/checkout@v4", "actions/setup-node@v4", "GITHUB_STEP_SUMMARY", "node scripts/render-greeting.mjs"]) {
  if (!workflow.includes(token)) {
    throw new Error(`Workflow missing token: ${token}`);
  }
}

console.log("Hello World workflow validation passed.");

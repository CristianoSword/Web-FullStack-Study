import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  ".github/workflows/environment-vars.yml",
  "config/environment-spec.json",
  "scripts/print-environment.mjs",
  "src/main.js",
  "src/test.js",
  "src/models/environment-variable.model.js",
  "src/models/workflow-output.model.js",
  "src/services/environment-plan.service.js",
  "src/services/summary-output.service.js"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const workflow = fs.readFileSync(path.resolve(root, ".github/workflows/environment-vars.yml"), "utf8");
for (const token of ["env:", "DEMO_TOKEN: ${{ secrets.DEMO_TOKEN }}", "GITHUB_OUTPUT", "GITHUB_STEP_SUMMARY", "node scripts/print-environment.mjs"]) {
  if (!workflow.includes(token)) {
    throw new Error(`Environment workflow missing token: ${token}`);
  }
}

console.log("Environment Variables workflow validation passed.");

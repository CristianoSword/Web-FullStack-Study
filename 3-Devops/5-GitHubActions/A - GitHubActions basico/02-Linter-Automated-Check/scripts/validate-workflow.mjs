import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  ".github/workflows/lint-check.yml",
  "eslint.config.js",
  "config/lint-targets.json",
  "src/main.js",
  "src/test.js",
  "src/models/lint-target.model.js",
  "src/models/workflow-step.model.js",
  "src/services/lint-workflow-plan.service.js",
  "src/services/report-summary.service.js"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const workflow = fs.readFileSync(path.resolve(root, ".github/workflows/lint-check.yml"), "utf8");
for (const token of ["strategy:", "matrix:", "actions/setup-node@v4", "cache: npm", "npm run lint", "GITHUB_STEP_SUMMARY"]) {
  if (!workflow.includes(token)) {
    throw new Error(`Lint workflow missing token: ${token}`);
  }
}

const eslintConfig = fs.readFileSync(path.resolve(root, "eslint.config.js"), "utf8");
for (const token of ["no-unused-vars", "prefer-const"]) {
  if (!eslintConfig.includes(token)) {
    throw new Error(`ESLint config missing token: ${token}`);
  }
}

console.log("Linter workflow validation passed.");

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  ".github/workflows/conditional-steps.yml",
  "config/condition-spec.json",
  "scripts/evaluate-conditions.mjs",
  "src/main.js",
  "src/test.js",
  "src/models/condition-branch.model.js",
  "src/models/step-result.model.js",
  "src/services/conditional-plan.service.js",
  "src/services/conditional-summary.service.js"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const workflow = fs.readFileSync(path.resolve(root, ".github/workflows/conditional-steps.yml"), "utf8");
for (const token of ["workflow_dispatch:", "if: ${{ github.event.inputs.run_tests != 'false' }}", "if: ${{ steps.validation.outputs.is_valid == 'true' && github.event.inputs.deploy_preview == 'true' }}", "if: ${{ failure() }}", "if: ${{ always() }}"]) {
  if (!workflow.includes(token)) {
    throw new Error(`Conditional workflow missing token: ${token}`);
  }
}

console.log("Conditional Steps Exec workflow validation passed.");

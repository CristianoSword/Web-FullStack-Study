import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  ".github/workflows/monorepo-dynamic-ci.yml",
  "config/monorepo-packages.json",
  "samples/changed-files.json",
  "scripts/detect-scopes.mjs",
  "src/main.js",
  "src/test.js",
  "src/models/monorepo-package.model.js",
  "src/models/detected-scope.model.js",
  "src/services/monorepo-plan.service.js",
  "src/services/scope-summary.service.js"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const workflow = fs.readFileSync(path.resolve(root, ".github/workflows/monorepo-dynamic-ci.yml"), "utf8");
for (const token of ["outputs:", "matrix: ${{ fromJson(needs.detect-changes.outputs.matrix) }}", "if: ${{ needs.detect-changes.outputs.has_changes == 'true' }}", "node scripts/detect-scopes.mjs"]) {
  if (!workflow.includes(token)) {
    throw new Error(`Dynamic CI workflow missing token: ${token}`);
  }
}

console.log("Monorepo Dynamic CI workflow validation passed.");

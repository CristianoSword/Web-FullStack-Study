import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  ".github/workflows/cache-and-artifacts.yml",
  "config/cache-spec.json",
  "scripts/create-build-output.mjs",
  "src/main.js",
  "src/test.js",
  "src/models/cache-definition.model.js",
  "src/models/artifact-transfer.model.js",
  "src/services/cache-plan.service.js",
  "src/services/artifact-summary.service.js"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const workflow = fs.readFileSync(path.resolve(root, ".github/workflows/cache-and-artifacts.yml"), "utf8");
for (const token of ["actions/cache@v4", "actions/upload-artifact@v4", "actions/download-artifact@v4", "needs: build", "dist/build-report.json"]) {
  if (!workflow.includes(token)) {
    throw new Error(`Artifacts workflow missing token: ${token}`);
  }
}

console.log("Artifacts Cache Speed workflow validation passed.");

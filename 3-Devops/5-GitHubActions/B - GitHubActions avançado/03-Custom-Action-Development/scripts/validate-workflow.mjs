import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  ".github/workflows/use-custom-action.yml",
  "config/action-spec.json",
  "samples/action-inputs.json",
  "action/action.yml",
  "action/package.json",
  "action/src/index.js",
  "src/main.js",
  "src/test.js",
  "src/models/action-contract.model.js",
  "src/models/action-usage.model.js",
  "src/services/custom-action-plan.service.js",
  "src/services/consumer-summary.service.js"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const actionManifest = fs.readFileSync(path.resolve(root, "action/action.yml"), "utf8");
for (const token of ["runs:", "using: node20", "main: src/index.js", "inputs:", "outputs:"]) {
  if (!actionManifest.includes(token)) {
    throw new Error(`Action manifest missing token: ${token}`);
  }
}

const workflow = fs.readFileSync(path.resolve(root, ".github/workflows/use-custom-action.yml"), "utf8");
for (const token of ["uses: ./action", "steps.release_note.outputs.summary", "steps.release_note.outputs.slug"]) {
  if (!workflow.includes(token)) {
    throw new Error(`Custom action workflow missing token: ${token}`);
  }
}

const actionCode = fs.readFileSync(path.resolve(root, "action/src/index.js"), "utf8");
for (const token of ["@actions/core", "core.getInput", "core.setOutput", "slugify"]) {
  if (!actionCode.includes(token)) {
    throw new Error(`Custom action code missing token: ${token}`);
  }
}

console.log("Custom Action Development workflow validation passed.");

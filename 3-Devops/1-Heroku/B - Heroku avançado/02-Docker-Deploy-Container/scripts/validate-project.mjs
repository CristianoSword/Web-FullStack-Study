import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "Dockerfile",
  "heroku.yml",
  "config/settings.json",
  "config/sample-image-manifest.json",
  "runtime-app/server.py",
  "src/main.js",
  "src/test.js",
  "src/models/registry-image.model.js",
  "src/models/release-flow.model.js",
  "src/services/container-deploy-plan.service.js",
  "src/services/image-manifest.service.js",
  "src/services/release-checklist.service.js",
  "scripts/check-container-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const dockerfile = fs.readFileSync(path.resolve(root, "Dockerfile"), "utf8");
if (!dockerfile.includes("runtime-app/server.py")) {
  throw new Error("Dockerfile is missing the runtime application entrypoint.");
}

const mainCode = fs.readFileSync(path.resolve(root, "src/main.js"), "utf8");
for (const branch of ["plan", "manifest", "release"]) {
  if (!mainCode.includes(branch)) {
    throw new Error(`Missing CLI branch: ${branch}`);
  }
}

console.log("Heroku docker deploy container project validation passed.");

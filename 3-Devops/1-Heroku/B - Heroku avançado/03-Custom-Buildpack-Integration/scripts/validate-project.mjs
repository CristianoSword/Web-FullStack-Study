import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "buildpack/bin/detect",
  "buildpack/bin/compile",
  "buildpack/bin/release",
  "buildpack/vendor/wasmtoy",
  "config/settings.json",
  "sample-app/Procfile",
  "sample-app/package.json",
  "sample-app/toolchain.toml",
  "sample-app/src/index.js",
  "src/main.js",
  "src/test.js",
  "src/models/buildpack-detect.model.js",
  "src/models/buildpack-plan.model.js",
  "src/services/buildpack-detect.service.js",
  "src/services/buildpack-plan.service.js",
  "src/services/buildpack-release.service.js",
  "scripts/check-buildpack-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const detectScript = fs.readFileSync(path.resolve(root, "buildpack/bin/detect"), "utf8");
if (!detectScript.includes("toolchain.toml")) {
  throw new Error("Detect script is missing the buildpack marker file.");
}

const releaseScript = fs.readFileSync(path.resolve(root, "buildpack/bin/release"), "utf8");
if (!releaseScript.includes("WASMTOY_HOME")) {
  throw new Error("Release script is missing exported WASMTOY_HOME.");
}

console.log("Custom buildpack integration project validation passed.");

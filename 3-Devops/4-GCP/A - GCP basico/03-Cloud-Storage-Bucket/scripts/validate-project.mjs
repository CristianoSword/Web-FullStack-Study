import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/bucket-spec.json",
  "config/cors.json",
  "config/lifecycle.json",
  "config/object-manifest.json",
  "samples/banner.svg",
  "src/main.js",
  "src/test.js",
  "src/models/bucket-spec.model.js",
  "src/models/object-entry.model.js",
  "src/models/public-url.model.js",
  "src/services/bucket-plan.service.js",
  "src/services/object-manifest.service.js",
  "src/services/public-url.service.js",
  "scripts/check-gcs-bucket.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const lifecycle = fs.readFileSync(path.resolve(root, "config/lifecycle.json"), "utf8");
if (!lifecycle.includes("\"Delete\"")) {
  throw new Error("Lifecycle config must include Delete action.");
}

console.log("Cloud Storage Bucket project validation passed.");

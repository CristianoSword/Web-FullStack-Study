import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/bucket-policy.json",
  "config/cors.json",
  "config/lifecycle.json",
  "config/object-manifest.json",
  "samples/banner.svg",
  "src/main.js",
  "src/test.js",
  "src/models/object-entry.model.js",
  "src/models/spaces-bucket.model.js",
  "src/models/cdn-asset.model.js",
  "src/services/spaces-plan.service.js",
  "src/services/object-manifest.service.js",
  "src/services/cdn-url.service.js",
  "scripts/check-spaces-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const policy = fs.readFileSync(path.resolve(root, "config/bucket-policy.json"), "utf8");
if (!policy.includes("public/*")) {
  throw new Error("Bucket policy must expose public prefix.");
}

console.log("Spaces Object Storage project validation passed.");

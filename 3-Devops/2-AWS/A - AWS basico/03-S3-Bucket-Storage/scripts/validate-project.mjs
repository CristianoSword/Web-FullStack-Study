import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/object-manifest.json",
  "policies/public-read-bucket-policy.json",
  "public/index.html",
  "public/assets/app.css",
  "src/main.js",
  "src/test.js",
  "src/models/bucket-plan.model.js",
  "src/models/website-plan.model.js",
  "src/services/bucket-plan.service.js",
  "src/services/bucket-policy.service.js",
  "src/services/website-plan.service.js",
  "scripts/check-s3-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const mainCode = fs.readFileSync(path.resolve(root, "src/main.js"), "utf8");
for (const branch of ["plan", "policy", "website"]) {
  if (!mainCode.includes(branch)) {
    throw new Error(`Missing CLI branch: ${branch}`);
  }
}

console.log("S3 bucket storage project validation passed.");

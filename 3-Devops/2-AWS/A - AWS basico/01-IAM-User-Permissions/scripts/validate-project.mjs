import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/credential-storage.json",
  "policies/deployer-readonly-policy.json",
  "src/main.js",
  "src/test.js",
  "src/models/credentials-plan.model.js",
  "src/models/iam-plan.model.js",
  "src/services/credentials-plan.service.js",
  "src/services/iam-plan.service.js",
  "src/services/policy-inspector.service.js",
  "scripts/check-iam-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const mainCode = fs.readFileSync(path.resolve(root, "src/main.js"), "utf8");
for (const branch of ["plan", "policy", "credentials"]) {
  if (!mainCode.includes(branch)) {
    throw new Error(`Missing CLI branch: ${branch}`);
  }
}

console.log("IAM user permissions project validation passed.");

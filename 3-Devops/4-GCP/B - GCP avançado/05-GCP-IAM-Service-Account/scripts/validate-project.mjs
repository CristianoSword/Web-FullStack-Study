import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/service-account-spec.json",
  "config/iam-bindings.json",
  "config/workload-identity-binding.json",
  "client/access-bucket.js",
  "samples/service-account-key.template.json",
  "src/main.js",
  "src/test.js",
  "src/models/service-account-spec.model.js",
  "src/models/iam-binding.model.js",
  "src/models/workload-identity-binding.model.js",
  "src/services/iam-plan.service.js",
  "src/services/binding-summary.service.js",
  "src/services/rollout-runbook.service.js",
  "scripts/check-iam-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const client = fs.readFileSync(path.resolve(root, "client/access-bucket.js"), "utf8");
for (const token of ["google-auth-library", "GoogleAuth", "getAccessToken"]) {
  if (!client.includes(token)) {
    throw new Error(`IAM client missing token: ${token}`);
  }
}

const workloadIdentity = fs.readFileSync(path.resolve(root, "config/workload-identity-binding.json"), "utf8");
for (const token of ["roles/iam.workloadIdentityUser", "study-gke", "study-api"]) {
  if (!workloadIdentity.includes(token)) {
    throw new Error(`Workload Identity config missing token: ${token}`);
  }
}

console.log("GCP IAM Service Account project validation passed.");

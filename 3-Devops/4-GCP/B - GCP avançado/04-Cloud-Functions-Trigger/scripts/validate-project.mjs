import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/function-spec.json",
  "config/storage-trigger.json",
  "function/package.json",
  "function/index.js",
  "samples/storage-finalized-event.json",
  "src/main.js",
  "src/test.js",
  "src/models/function-spec.model.js",
  "src/models/storage-trigger.model.js",
  "src/models/process-result.model.js",
  "src/services/function-deploy-plan.service.js",
  "src/services/event-summary.service.js",
  "src/services/rollout-runbook.service.js",
  "scripts/check-cloud-function.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const functionHandler = fs.readFileSync(path.resolve(root, "function/index.js"), "utf8");
for (const token of ["@google-cloud/functions-framework", "handleStorageUpload", "extractObjectSummary"]) {
  if (!functionHandler.includes(token)) {
    throw new Error(`Function handler missing token: ${token}`);
  }
}

const sampleEvent = fs.readFileSync(path.resolve(root, "samples/storage-finalized-event.json"), "utf8");
for (const token of ["google.cloud.storage.object.v1.finalized", "study-upload-bucket", "images/profile-1001.png"]) {
  if (!sampleEvent.includes(token)) {
    throw new Error(`Sample event missing token: ${token}`);
  }
}

console.log("Cloud Functions Trigger project validation passed.");

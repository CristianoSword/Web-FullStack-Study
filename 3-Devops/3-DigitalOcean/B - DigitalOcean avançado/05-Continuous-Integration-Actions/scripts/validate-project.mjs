import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/pipeline-stages.json",
  "config/github-secrets.json",
  ".github/workflows/digitalocean-deploy.yml",
  "app/package.json",
  "app/server.js",
  "ecosystem.config.cjs",
  "scripts/deploy.sh",
  "src/main.js",
  "src/test.js",
  "src/models/pipeline-stage.model.js",
  "src/models/secret-contract.model.js",
  "src/models/recovery-step.model.js",
  "src/services/actions-plan.service.js",
  "src/services/workflow-summary.service.js",
  "src/services/recovery-runbook.service.js",
  "scripts/check-ci-actions.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const workflow = fs.readFileSync(path.resolve(root, ".github/workflows/digitalocean-deploy.yml"), "utf8");
for (const token of ["actions/checkout@v4", "actions/setup-node@v4", "actions/upload-artifact@v4", "scp -i ~/.ssh/id_ed25519"]) {
  if (!workflow.includes(token)) {
    throw new Error(`Workflow missing token: ${token}`);
  }
}

console.log("Continuous Integration Actions project validation passed.");

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/resource-plan.json",
  "config/script-sequence.json",
  "scripts/provision.sh",
  "scripts/inspect.sh",
  "scripts/rollback.sh",
  "src/main.js",
  "src/test.js",
  "src/models/automation-step.model.js",
  "src/models/resource-group.model.js",
  "src/models/rollback-step.model.js",
  "src/services/automation-plan.service.js",
  "src/services/script-summary.service.js",
  "src/services/rollback-plan.service.js",
  "scripts/check-cli-automation.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const provision = fs.readFileSync(path.resolve(root, "scripts/provision.sh"), "utf8");
for (const token of ["doctl projects list", "doctl compute droplet create", "doctl compute firewall list"]) {
  if (!provision.includes(token)) {
    throw new Error(`Provision script missing token: ${token}`);
  }
}

console.log("DO CLI Automation Script project validation passed.");

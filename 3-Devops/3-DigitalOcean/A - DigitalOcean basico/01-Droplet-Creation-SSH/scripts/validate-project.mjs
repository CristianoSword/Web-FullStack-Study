import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/droplet-spec.json",
  "config/ssh-key.json",
  "cloud-init/bootstrap.yaml",
  "src/main.js",
  "src/test.js",
  "src/models/droplet-spec.model.js",
  "src/models/ssh-key.model.js",
  "src/models/ssh-session.model.js",
  "src/services/droplet-plan.service.js",
  "src/services/ssh-access.service.js",
  "src/services/cloud-init-summary.service.js",
  "scripts/check-droplet-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const mainCode = fs.readFileSync(path.resolve(root, "src/main.js"), "utf8");
for (const branch of ["plan", "ssh", "cloud-init"]) {
  if (!mainCode.includes(branch)) {
    throw new Error(`Missing CLI branch: ${branch}`);
  }
}

console.log("Droplet Creation SSH project validation passed.");

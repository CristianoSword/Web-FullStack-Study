import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/instance-spec.json",
  "config/firewall-rule.json",
  "startup/startup.sh",
  "src/main.js",
  "src/test.js",
  "src/models/firewall-rule.model.js",
  "src/models/instance-spec.model.js",
  "src/models/ssh-check.model.js",
  "src/services/compute-plan.service.js",
  "src/services/ssh-plan.service.js",
  "src/services/startup-summary.service.js",
  "scripts/check-compute-engine.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const startup = fs.readFileSync(path.resolve(root, "startup/startup.sh"), "utf8");
if (!startup.includes("apt-get install -y nginx")) {
  throw new Error("Startup script must install nginx.");
}

console.log("Compute Engine VM project validation passed.");

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/inbound-rules.json",
  "config/outbound-rules.json",
  "config/droplet-selector.json",
  "src/main.js",
  "src/test.js",
  "src/models/firewall-rule.model.js",
  "src/models/firewall-target.model.js",
  "src/models/verification-check.model.js",
  "src/services/firewall-plan.service.js",
  "src/services/firewall-rules.service.js",
  "src/services/firewall-verification.service.js",
  "scripts/check-firewall-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const inbound = JSON.parse(fs.readFileSync(path.resolve(root, "config/inbound-rules.json"), "utf8"));
if (!inbound.some((rule) => rule.ports === "22")) {
  throw new Error("Inbound rules must include SSH restriction.");
}

console.log("Firewall Rules Setup project validation passed.");

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/load-balancer-spec.json",
  "config/forwarding-rules.json",
  "config/health-check.json",
  "src/main.js",
  "src/test.js",
  "src/models/forwarding-rule.model.js",
  "src/models/health-check.model.js",
  "src/models/load-balancer-spec.model.js",
  "src/services/load-balancer-plan.service.js",
  "src/services/forwarding-rules.service.js",
  "src/services/cutover-runbook.service.js",
  "scripts/check-do-load-balancer.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const rules = JSON.parse(fs.readFileSync(path.resolve(root, "config/forwarding-rules.json"), "utf8"));
if (!rules.some((rule) => rule.entryProtocol === "https")) {
  throw new Error("Load balancer must include HTTPS forwarding rule.");
}

console.log("DigitalOcean Load Balancer project validation passed.");

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/network-profile.json",
  "cloud-init/user-data.sh",
  "src/main.js",
  "src/test.js",
  "src/models/ec2-launch-plan.model.js",
  "src/models/ssh-checklist.model.js",
  "src/services/ec2-launch-plan.service.js",
  "src/services/ssh-checklist.service.js",
  "src/services/user-data-summary.service.js",
  "scripts/check-ec2-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const userData = fs.readFileSync(path.resolve(root, "cloud-init/user-data.sh"), "utf8");
if (!userData.includes("httpd")) {
  throw new Error("user-data script is missing the bootstrap httpd installation.");
}

console.log("EC2 instance launch project validation passed.");

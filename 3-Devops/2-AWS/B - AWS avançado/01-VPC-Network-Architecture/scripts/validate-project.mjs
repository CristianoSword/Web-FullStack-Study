import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/subnets.json",
  "config/routes.json",
  "diagrams/topology.mmd",
  "src/main.js",
  "src/test.js",
  "src/models/subnet-summary.model.js",
  "src/models/vpc-plan.model.js",
  "src/services/route-plan.service.js",
  "src/services/subnet-summary.service.js",
  "src/services/vpc-plan.service.js",
  "scripts/check-vpc-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const mainCode = fs.readFileSync(path.resolve(root, "src/main.js"), "utf8");
for (const branch of ["plan", "subnets", "routes"]) {
  if (!mainCode.includes(branch)) {
    throw new Error(`Missing CLI branch: ${branch}`);
  }
}

console.log("VPC network architecture project validation passed.");

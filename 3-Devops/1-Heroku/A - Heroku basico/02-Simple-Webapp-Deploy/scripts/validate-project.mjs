import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "Procfile",
  "app.json",
  "config/settings.json",
  "public/index.html",
  "src/main.js",
  "src/test.js",
  "src/models/deploy-profile.model.js",
  "src/models/route-map.model.js",
  "src/services/deploy-readiness.service.js",
  "scripts/check-deploy-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const procfile = fs.readFileSync(path.resolve(root, "Procfile"), "utf8");
if (!procfile.includes("web: node src/main.js")) {
  throw new Error("Procfile is missing the Heroku web dyno command.");
}

const appCode = fs.readFileSync(path.resolve(root, "src/main.js"), "utf8");
for (const route of ["/health", "/manifest", "/deploy-checklist"]) {
  if (!appCode.includes(route)) {
    throw new Error(`Server route missing: ${route}`);
  }
}

console.log("Simple webapp deploy project validation passed.");

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/sample-auth-state.json",
  "src/main.js",
  "src/test.js",
  "src/models/cli-audit.model.js",
  "src/models/command-plan.model.js",
  "src/services/heroku-cli-audit.service.js",
  "src/services/login-plan.service.js",
  "src/utils/command-runner.js",
  "scripts/check-command-plan.ps1",
  "scripts/run-audit.ps1",
  "scripts/run-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const settings = fs.readFileSync(path.resolve(root, "config/settings.json"), "utf8");
if (!settings.includes("heroku login") || !settings.includes("heroku auth:whoami")) {
  throw new Error("Heroku login flow configuration is incomplete.");
}

const entrypoint = fs.readFileSync(path.resolve(root, "src/main.js"), "utf8");
for (const command of ["audit", "plan", "sample-auth-state"]) {
  if (!entrypoint.includes(command)) {
    throw new Error(`Main CLI command is missing branch: ${command}`);
  }
}

console.log("Heroku CLI login project validation passed.");

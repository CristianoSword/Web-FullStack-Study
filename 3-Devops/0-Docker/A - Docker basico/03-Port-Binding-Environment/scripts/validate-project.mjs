import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const requiredFiles = [
  "Dockerfile",
  "package.json",
  "package-lock.json",
  "config/bootstrap.json",
  "config/runtime.settings.json",
  "models/env-contract.json",
  "models/port-binding-profile.json",
  "models/runtime-schema.json",
  "src/server.mjs",
  "src/lib/runtime-config.mjs",
  "src/services/environment-summary-service.mjs",
  "src/routes/health-route.mjs",
  "src/routes/environment-route.mjs",
  "src/routes/binding-route.mjs",
  "scripts/build-image.ps1",
  "scripts/run-default.ps1",
  "scripts/run-alt-port.ps1",
  "scripts/check-default.ps1",
  "scripts/check-alt.ps1",
  "scripts/check-command-plan.ps1"
];

for (const target of requiredFiles) {
  if (!fs.existsSync(path.resolve(target))) {
    throw new Error(`Missing file: ${target}`);
  }
}

const dockerfile = fs.readFileSync(path.resolve("Dockerfile"), "utf8");
if (!dockerfile.includes("EXPOSE 3010")) {
  throw new Error("Dockerfile is missing the expected EXPOSE instruction.");
}

for (const target of [
  "src/server.mjs",
  "src/lib/runtime-config.mjs",
  "src/services/environment-summary-service.mjs",
  "src/routes/health-route.mjs",
  "src/routes/environment-route.mjs",
  "src/routes/binding-route.mjs"
]) {
  execFileSync(process.execPath, ["--check", target], { stdio: "pipe" });
}

console.log("Port binding environment lab validation passed.");

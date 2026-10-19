import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const requiredFiles = [
  "Dockerfile",
  "package.json",
  "package-lock.json",
  "config/bootstrap.json",
  "config/image.settings.json",
  "models/app-contract.json",
  "models/image-profile.json",
  "models/runtime-schema.json",
  "src/server.mjs",
  "src/lib/runtime-config.mjs",
  "src/routes/health-route.mjs",
  "src/routes/metadata-route.mjs",
  "src/services/app-metadata-service.mjs",
  "scripts/build-image.ps1",
  "scripts/run-container.ps1",
  "scripts/inspect-image.ps1",
  "scripts/check-http.ps1",
  "scripts/check-command-plan.ps1"
];

for (const target of requiredFiles) {
  if (!fs.existsSync(path.resolve(target))) {
    throw new Error(`Missing file: ${target}`);
  }
}

const dockerfile = fs.readFileSync(path.resolve("Dockerfile"), "utf8");
if (!dockerfile.includes("npm ci --omit=dev")) {
  throw new Error("Dockerfile is missing the npm ci optimization.");
}

if (!dockerfile.includes("HEALTHCHECK")) {
  throw new Error("Dockerfile is missing a HEALTHCHECK instruction.");
}

for (const target of [
  "src/server.mjs",
  "src/lib/runtime-config.mjs",
  "src/routes/health-route.mjs",
  "src/routes/metadata-route.mjs",
  "src/services/app-metadata-service.mjs"
]) {
  execFileSync(process.execPath, ["--check", target], { stdio: "pipe" });
}

console.log("Node Dockerfile lab validation passed.");

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(currentDirectory, "..");

const requiredFiles = [
  "README.md",
  "package.json",
  "Dockerfile",
  "app/package.json",
  "app/server.js",
  "config/release-plan.json",
  "config/rollout-spec.json",
  "k8s/namespace.yaml",
  "k8s/configmap.yaml",
  "k8s/deployment.yaml",
  "k8s/service.yaml",
  "k8s/pod-disruption-budget.yaml",
  "scripts/deploy.sh",
  "scripts/validate-deployment.sh",
  "scripts/check-rolling-update-plan.ps1",
  "src/main.js",
  "src/test.js"
];

await Promise.all(
  requiredFiles.map(async (relativePath) => {
    await readFile(path.join(rootDirectory, relativePath), "utf8");
  })
);

const deployment = await readFile(path.join(rootDirectory, "k8s/deployment.yaml"), "utf8");
const manifestChecks = [
  "type: RollingUpdate",
  "maxSurge: 1",
  "maxUnavailable: 0",
  "startupProbe:",
  "readinessProbe:",
  "revisionHistoryLimit: 5",
  "progressDeadlineSeconds: 180"
];

const missingTokens = manifestChecks.filter((token) => !deployment.includes(token));
if (missingTokens.length > 0) {
  throw new Error(`Deployment manifest missing tokens: ${missingTokens.join(", ")}`);
}

console.log("Rolling updates project structure looks good.");

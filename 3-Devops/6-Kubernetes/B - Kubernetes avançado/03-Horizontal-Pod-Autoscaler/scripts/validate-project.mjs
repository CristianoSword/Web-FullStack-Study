import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(currentDirectory, "..");

const files = [
  "README.md",
  "package.json",
  "Dockerfile",
  "app/package.json",
  "app/server.js",
  "config/autoscaling-spec.json",
  "config/load-test-plan.json",
  "k8s/namespace.yaml",
  "k8s/configmap.yaml",
  "k8s/deployment.yaml",
  "k8s/service.yaml",
  "k8s/hpa.yaml",
  "k8s/load-generator-job.yaml",
  "scripts/deploy.sh",
  "scripts/validate-deployment.sh",
  "scripts/check-hpa-plan.ps1",
  "src/main.js",
  "src/test.js"
];

await Promise.all(files.map((relativePath) => readFile(path.join(rootDirectory, relativePath), "utf8")));

const deployment = await readFile(path.join(rootDirectory, "k8s/deployment.yaml"), "utf8");
const hpa = await readFile(path.join(rootDirectory, "k8s/hpa.yaml"), "utf8");

const missing = [];
for (const token of ["requests:", "cpu: \"150m\"", "limits:", "cpu: \"400m\""]) {
  if (!deployment.includes(token)) {
    missing.push(token);
  }
}

for (const token of ["apiVersion: autoscaling/v2", "averageUtilization: 65", "stabilizationWindowSeconds: 120"]) {
  if (!hpa.includes(token)) {
    missing.push(token);
  }
}

if (missing.length > 0) {
  throw new Error(`Autoscaling project missing tokens: ${missing.join(", ")}`);
}

console.log("Horizontal Pod Autoscaler project structure looks good.");

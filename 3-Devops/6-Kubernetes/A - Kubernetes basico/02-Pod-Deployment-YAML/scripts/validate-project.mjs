import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/workload-spec.json",
  "config/label-strategy.json",
  "k8s/namespace.yaml",
  "k8s/pod.yaml",
  "k8s/deployment.yaml",
  "k8s/service.yaml",
  "scripts/deploy.sh",
  "scripts/validate-deployment.sh",
  "scripts/check-workload-plan.ps1",
  "src/main.js",
  "src/test.js",
  "src/models/workload-spec.model.js",
  "src/models/label-strategy.model.js",
  "src/models/manifest-check.model.js",
  "src/services/workload-plan.service.js",
  "src/services/manifest-summary.service.js",
  "src/services/smoke-check.service.js"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const podManifest = fs.readFileSync(path.resolve(root, "k8s/pod.yaml"), "utf8");
for (const token of ["kind: Pod", "name: study-nginx-pod", "image: nginx:1.27-alpine"]) {
  if (!podManifest.includes(token)) {
    throw new Error(`Pod manifest missing token: ${token}`);
  }
}

const deploymentManifest = fs.readFileSync(path.resolve(root, "k8s/deployment.yaml"), "utf8");
for (const token of ["kind: Deployment", "replicas: 2", "matchLabels:", "readinessProbe:"]) {
  if (!deploymentManifest.includes(token)) {
    throw new Error(`Deployment manifest missing token: ${token}`);
  }
}

console.log("Pod Deployment YAML project validation passed.");

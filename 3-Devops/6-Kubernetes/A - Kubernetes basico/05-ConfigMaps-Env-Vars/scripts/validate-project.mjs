import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/configmap-spec.json",
  "config/env-mapping.json",
  "k8s/namespace.yaml",
  "k8s/configmap.yaml",
  "k8s/deployment.yaml",
  "k8s/service.yaml",
  "scripts/deploy.sh",
  "scripts/validate-deployment.sh",
  "scripts/check-configmap-plan.ps1",
  "src/main.js",
  "src/test.js",
  "src/models/configmap-spec.model.js",
  "src/models/env-mapping.model.js",
  "src/models/manifest-check.model.js",
  "src/services/configmap-plan.service.js",
  "src/services/configmap-summary.service.js",
  "src/services/smoke-check.service.js"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const configmap = fs.readFileSync(path.resolve(root, "k8s/configmap.yaml"), "utf8");
for (const token of ["kind: ConfigMap", "name: config-web-settings", "WELCOME_MESSAGE: hello-from-configmap"]) {
  if (!configmap.includes(token)) {
    throw new Error(`ConfigMap manifest missing token: ${token}`);
  }
}

const deployment = fs.readFileSync(path.resolve(root, "k8s/deployment.yaml"), "utf8");
for (const token of ["envFrom:", "configMapRef:", "configMapKeyRef:", "EXPLICIT_WELCOME_MESSAGE"]) {
  if (!deployment.includes(token)) {
    throw new Error(`Deployment manifest missing token: ${token}`);
  }
}

console.log("ConfigMaps Env Vars project validation passed.");

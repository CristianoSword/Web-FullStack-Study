import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/minikube-profile.json",
  "config/addons.json",
  "k8s/namespace.yaml",
  "k8s/configmap.yaml",
  "k8s/deployment.yaml",
  "k8s/service.yaml",
  "scripts/deploy.sh",
  "scripts/validate-deployment.sh",
  "scripts/check-minikube-plan.ps1",
  "src/main.js",
  "src/test.js",
  "src/models/minikube-profile.model.js",
  "src/models/addon.model.js",
  "src/models/manifest-check.model.js",
  "src/services/minikube-plan.service.js",
  "src/services/manifest-summary.service.js",
  "src/services/smoke-check.service.js"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const deployScript = fs.readFileSync(path.resolve(root, "scripts/deploy.sh"), "utf8");
for (const token of ["minikube start", "minikube addons enable ingress", "kubectl apply -f k8s/deployment.yaml"]) {
  if (!deployScript.includes(token)) {
    throw new Error(`Deploy script missing token: ${token}`);
  }
}

const deployment = fs.readFileSync(path.resolve(root, "k8s/deployment.yaml"), "utf8");
for (const token of ["kind: Deployment", "namespace: study-local", "image: nginx:1.27-alpine", "readinessProbe:"]) {
  if (!deployment.includes(token)) {
    throw new Error(`Deployment manifest missing token: ${token}`);
  }
}

console.log("Minikube Cluster Setup project validation passed.");

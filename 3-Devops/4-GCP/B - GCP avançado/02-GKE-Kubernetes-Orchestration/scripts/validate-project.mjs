import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/cluster-spec.json",
  "config/app-spec.json",
  "app/server.js",
  "Dockerfile",
  "k8s/namespace.yaml",
  "k8s/configmap.yaml",
  "k8s/secret.yaml",
  "k8s/deployment.yaml",
  "k8s/service.yaml",
  "k8s/ingress.yaml",
  "k8s/hpa.yaml",
  "src/main.js",
  "src/test.js",
  "src/models/cluster-nodepool.model.js",
  "src/models/app-workload.model.js",
  "src/models/manifest-check.model.js",
  "src/services/gke-plan.service.js",
  "src/services/manifest-summary.service.js",
  "src/services/rollout-runbook.service.js",
  "scripts/check-gke-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const deployment = fs.readFileSync(path.resolve(root, "k8s/deployment.yaml"), "utf8");
for (const token of ["kind: Deployment", "readinessProbe:", "livenessProbe:", "image: us-central1-docker.pkg.dev/study-platform-dev/study-registry/study-api:1.0.0"]) {
  if (!deployment.includes(token)) {
    throw new Error(`Deployment manifest missing token: ${token}`);
  }
}

const ingress = fs.readFileSync(path.resolve(root, "k8s/ingress.yaml"), "utf8");
for (const token of ["kind: Ingress", "kubernetes.io/ingress.class: gce", "host: study-api.example.com"]) {
  if (!ingress.includes(token)) {
    throw new Error(`Ingress manifest missing token: ${token}`);
  }
}

console.log("GKE Kubernetes Orchestration project validation passed.");

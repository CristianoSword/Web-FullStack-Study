import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/service-spec.json",
  "config/access-flow.json",
  "k8s/namespace.yaml",
  "k8s/deployment.yaml",
  "k8s/service.yaml",
  "scripts/deploy.sh",
  "scripts/validate-deployment.sh",
  "scripts/check-nodeport-plan.ps1",
  "src/main.js",
  "src/test.js",
  "src/models/service-spec.model.js",
  "src/models/access-flow.model.js",
  "src/models/manifest-check.model.js",
  "src/services/nodeport-plan.service.js",
  "src/services/service-summary.service.js",
  "src/services/smoke-check.service.js"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const serviceManifest = fs.readFileSync(path.resolve(root, "k8s/service.yaml"), "utf8");
for (const token of ["kind: Service", "type: NodePort", "nodePort: 30082", "name: nodeport-web-service"]) {
  if (!serviceManifest.includes(token)) {
    throw new Error(`Service manifest missing token: ${token}`);
  }
}

const deployScript = fs.readFileSync(path.resolve(root, "scripts/validate-deployment.sh"), "utf8");
for (const token of ["kubectl rollout status deployment/nodeport-web-deployment", "minikube service nodeport-web-service -n study-nodeport --url"]) {
  if (!deployScript.includes(token)) {
    throw new Error(`Validation script missing token: ${token}`);
  }
}

console.log("Kubernetes Service NodePort project validation passed.");

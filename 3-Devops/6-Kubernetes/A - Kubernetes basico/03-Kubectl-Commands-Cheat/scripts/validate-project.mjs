import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/cluster-context.json",
  "config/command-groups.json",
  "docs/kubectl-cheatsheet.md",
  "k8s/namespace.yaml",
  "k8s/deployment.yaml",
  "k8s/service.yaml",
  "scripts/deploy.sh",
  "scripts/validate-deployment.sh",
  "scripts/check-kubectl-cheat.ps1",
  "src/main.js",
  "src/test.js",
  "src/models/cluster-context.model.js",
  "src/models/command-group.model.js",
  "src/models/manifest-check.model.js",
  "src/services/command-plan.service.js",
  "src/services/cheatsheet-summary.service.js",
  "src/services/smoke-check.service.js"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const cheatsheet = fs.readFileSync(path.resolve(root, "docs/kubectl-cheatsheet.md"), "utf8");
for (const token of ["kubectl get pods -n study-cheat", "kubectl logs deployment/cheat-web-deployment -n study-cheat", "kubectl scale deployment cheat-web-deployment --replicas=3 -n study-cheat"]) {
  if (!cheatsheet.includes(token)) {
    throw new Error(`Cheatsheet missing token: ${token}`);
  }
}

const deployment = fs.readFileSync(path.resolve(root, "k8s/deployment.yaml"), "utf8");
for (const token of ["kind: Deployment", "name: cheat-web-deployment", "app: cheat-web"]) {
  if (!deployment.includes(token)) {
    throw new Error(`Deployment manifest missing token: ${token}`);
  }
}

console.log("Kubectl Commands Cheat project validation passed.");

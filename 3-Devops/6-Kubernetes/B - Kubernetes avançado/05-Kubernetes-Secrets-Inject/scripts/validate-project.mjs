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
  "config/secret-access-policy.json",
  "config/secret-spec.json",
  "k8s/namespace.yaml",
  "k8s/secret.yaml",
  "k8s/configmap.yaml",
  "k8s/deployment.yaml",
  "k8s/service.yaml",
  "scripts/deploy.sh",
  "scripts/validate-deployment.sh",
  "scripts/check-secrets-plan.ps1",
  "src/main.js",
  "src/test.js"
];

await Promise.all(files.map((relativePath) => readFile(path.join(rootDirectory, relativePath), "utf8")));

const deployment = await readFile(path.join(rootDirectory, "k8s/deployment.yaml"), "utf8");
const secret = await readFile(path.join(rootDirectory, "k8s/secret.yaml"), "utf8");

const missing = [];
for (const token of ["secretKeyRef:", "mountPath: /var/run/secrets/app", "secretName: payments-api-secret"]) {
  if (!deployment.includes(token)) {
    missing.push(token);
  }
}

for (const token of ["kind: Secret", "db-username:", "signing-token:"]) {
  if (!secret.includes(token)) {
    missing.push(token);
  }
}

if (missing.length > 0) {
  throw new Error(`Secrets project missing tokens: ${missing.join(", ")}`);
}

console.log("Secrets injection project structure looks good.");

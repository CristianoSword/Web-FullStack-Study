import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(currentDirectory, "..");

const files = [
  "README.md",
  "package.json",
  "apps/web-portal/package.json",
  "apps/web-portal/server.js",
  "apps/orders-api/package.json",
  "apps/orders-api/server.js",
  "config/ingress-spec.json",
  "config/routing-smoke-plan.json",
  "k8s/namespace.yaml",
  "k8s/web-deployment.yaml",
  "k8s/web-service.yaml",
  "k8s/api-deployment.yaml",
  "k8s/api-service.yaml",
  "k8s/ingress.yaml",
  "scripts/deploy.sh",
  "scripts/validate-deployment.sh",
  "scripts/check-ingress-plan.ps1",
  "src/main.js",
  "src/test.js"
];

await Promise.all(files.map((relativePath) => readFile(path.join(rootDirectory, relativePath), "utf8")));

const ingress = await readFile(path.join(rootDirectory, "k8s/ingress.yaml"), "utf8");
const missing = [
  "ingressClassName: nginx",
  "host: study.local",
  "secretName: study-local-tls",
  "path: /api",
  "name: orders-api"
].filter((token) => !ingress.includes(token));

if (missing.length > 0) {
  throw new Error(`Ingress manifest missing tokens: ${missing.join(", ")}`);
}

console.log("Ingress routing project structure looks good.");

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
  "config/backup-policy.json",
  "config/storage-spec.json",
  "k8s/namespace.yaml",
  "k8s/configmap.yaml",
  "k8s/persistent-volume.yaml",
  "k8s/persistent-volume-claim.yaml",
  "k8s/headless-service.yaml",
  "k8s/statefulset.yaml",
  "k8s/service.yaml",
  "scripts/deploy.sh",
  "scripts/validate-deployment.sh",
  "scripts/check-storage-plan.ps1",
  "src/main.js",
  "src/test.js"
];

await Promise.all(files.map((relativePath) => readFile(path.join(rootDirectory, relativePath), "utf8")));

const statefulSet = await readFile(path.join(rootDirectory, "k8s/statefulset.yaml"), "utf8");
const pvc = await readFile(path.join(rootDirectory, "k8s/persistent-volume-claim.yaml"), "utf8");

const missing = [
  "kind: StatefulSet",
  "serviceName: notes-api-headless",
  "mountPath: /data",
  "claimName: notes-pvc"
].filter((token) => !statefulSet.includes(token));

if (!pvc.includes("storage: 2Gi")) {
  missing.push("pvc storage");
}

if (missing.length > 0) {
  throw new Error(`Persistent storage manifest missing: ${missing.join(", ")}`);
}

console.log("Persistent volumes project structure looks good.");

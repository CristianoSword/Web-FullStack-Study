import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(currentDirectory, "..");

const files = [
  "README.md",
  "package.json",
  "vercel.json",
  ".env.example",
  "api/deploy-context.js",
  "public/index.html",
  "public/app.js",
  "public/styles.css",
  "config/branch-preview-policy.json",
  "config/deploy-metadata.json",
  "scripts/check-preview-branch.ps1",
  "src/main.js",
  "src/test.js"
];

await Promise.all(files.map((relativePath) => readFile(path.join(rootDirectory, relativePath), "utf8")));

const apiFile = await readFile(path.join(rootDirectory, "api/deploy-context.js"), "utf8");
const envFile = await readFile(path.join(rootDirectory, ".env.example"), "utf8");

const missing = [
  "VERCEL_ENV",
  "VERCEL_GIT_COMMIT_REF",
  "VERCEL_URL"
].filter((token) => !envFile.includes(token));

for (const token of ["deploymentStage", "resolveStage(environment, branch)", "source: \"vercel-preview-branch\""]) {
  if (!apiFile.includes(token)) {
    missing.push(token);
  }
}

if (missing.length > 0) {
  throw new Error(`Preview branch deploy lab missing tokens: ${missing.join(", ")}`);
}

console.log("Preview branch deploy structure looks good.");

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
  "api/config.js",
  "public/index.html",
  "public/app.js",
  "public/styles.css",
  "config/environment-matrix.json",
  "config/vercel-env-flow.json",
  "scripts/check-project-variables.ps1",
  "src/main.js",
  "src/test.js"
];

await Promise.all(files.map((relativePath) => readFile(path.join(rootDirectory, relativePath), "utf8")));

const apiFile = await readFile(path.join(rootDirectory, "api/config.js"), "utf8");
const envFile = await readFile(path.join(rootDirectory, ".env.example"), "utf8");

const missing = [
  "NEXT_PUBLIC_APP_NAME",
  "NEXT_PUBLIC_STAGE",
  "API_BASE_URL",
  "INTERNAL_API_TOKEN"
].filter((token) => !envFile.includes(token));

for (const token of ["internalToken", "mask(process.env.INTERNAL_API_TOKEN)", "source: \"vercel-project-variables\""]) {
  if (!apiFile.includes(token)) {
    missing.push(token);
  }
}

if (missing.length > 0) {
  throw new Error(`Project variables lab missing tokens: ${missing.join(", ")}`);
}

console.log("Project variables structure looks good.");

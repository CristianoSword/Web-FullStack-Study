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
  "api/health.js",
  "config/cli-flow.json",
  "config/project-link.template.json",
  "scripts/check-cli-setup.ps1",
  "src/main.js",
  "src/test.js"
];

await Promise.all(files.map((relativePath) => readFile(path.join(rootDirectory, relativePath), "utf8")));

const vercelConfig = await readFile(path.join(rootDirectory, "vercel.json"), "utf8");
const apiFile = await readFile(path.join(rootDirectory, "api/health.js"), "utf8");

const missing = [
  "\"version\": 2",
  "\"runtime\": \"nodejs20.x\"",
  "\"src\": \"/api/health\""
].filter((token) => !vercelConfig.includes(token));

if (!apiFile.includes("platform: \"vercel\"")) {
  missing.push("platform field");
}

if (missing.length > 0) {
  throw new Error(`Vercel CLI setup missing tokens: ${missing.join(", ")}`);
}

console.log("Vercel CLI setup structure looks good.");

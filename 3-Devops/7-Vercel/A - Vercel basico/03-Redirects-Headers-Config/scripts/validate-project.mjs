import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(currentDirectory, "..");

const files = [
  "README.md",
  "package.json",
  "vercel.json",
  "public/index.html",
  "public/guides.html",
  "public/styles.css",
  "public/assets/logo.svg",
  "config/headers-policy.json",
  "config/redirect-rules.json",
  "scripts/check-redirects-headers.ps1",
  "src/main.js",
  "src/test.js"
];

await Promise.all(files.map((relativePath) => readFile(path.join(rootDirectory, relativePath), "utf8")));

const vercelConfig = await readFile(path.join(rootDirectory, "vercel.json"), "utf8");
const missing = [
  "\"source\": \"/blog\"",
  "\"destination\": \"/guides\"",
  "\"key\": \"X-Frame-Options\"",
  "\"key\": \"Cache-Control\""
].filter((token) => !vercelConfig.includes(token));

if (missing.length > 0) {
  throw new Error(`Redirects/headers project missing tokens: ${missing.join(", ")}`);
}

console.log("Redirects and headers structure looks good.");

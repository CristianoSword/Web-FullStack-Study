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
  "public/app.js",
  "public/styles.css",
  "config/deploy-strategy.json",
  "config/routes.json",
  "scripts/check-spa-deploy.ps1",
  "src/main.js",
  "src/test.js"
];

await Promise.all(files.map((relativePath) => readFile(path.join(rootDirectory, relativePath), "utf8")));

const vercelConfig = await readFile(path.join(rootDirectory, "vercel.json"), "utf8");
const appFile = await readFile(path.join(rootDirectory, "public/app.js"), "utf8");

const missing = [
  "\"cleanUrls\": true",
  "\"source\": \"/(.*)\"",
  "\"destination\": \"/index.html\""
].filter((token) => !vercelConfig.includes(token));

if (!appFile.includes("window.history.pushState")) {
  missing.push("window.history.pushState");
}

if (missing.length > 0) {
  throw new Error(`SPA deploy project missing tokens: ${missing.join(", ")}`);
}

console.log("SPA static deploy structure looks good.");

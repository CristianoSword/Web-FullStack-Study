import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(currentDirectory, "..");

const files = [
  "README.md",
  "package.json",
  "vercel.json",
  "turbo.json",
  "apps/web/package.json",
  "apps/web/dist/index.html",
  "apps/web/src/app.js",
  "apps/admin/package.json",
  "apps/admin/src/app.js",
  "packages/ui/package.json",
  "packages/ui/src/badge.js",
  "config/app-map.json",
  "config/build-profile.json",
  "scripts/should-build.mjs",
  "scripts/check-monorepo-build.ps1",
  "src/main.js",
  "src/test.js"
];

await Promise.all(files.map((relativePath) => readFile(path.join(rootDirectory, relativePath), "utf8")));

const rootPackage = await readFile(path.join(rootDirectory, "package.json"), "utf8");
const vercelConfig = await readFile(path.join(rootDirectory, "vercel.json"), "utf8");
const missing = [];

for (const token of ["\"workspaces\"", "\"apps/*\"", "\"packages/*\""]) {
  if (!rootPackage.includes(token)) {
    missing.push(token);
  }
}

for (const token of ["\"buildCommand\": \"npm run build:web\"", "\"outputDirectory\": \"apps/web/dist\"", "\"ignoreCommand\": \"node scripts/should-build.mjs\""]) {
  if (!vercelConfig.includes(token)) {
    missing.push(token);
  }
}

if (missing.length > 0) {
  throw new Error(`Monorepo custom build project missing tokens: ${missing.join(", ")}`);
}

console.log("Monorepo custom build structure looks good.");

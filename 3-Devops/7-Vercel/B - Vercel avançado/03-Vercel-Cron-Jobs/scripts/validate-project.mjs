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
  "api/cron/daily-report.js",
  "api/cron/cleanup-previews.js",
  "lib/cron-auth.js",
  "lib/response.js",
  "lib/tasks.js",
  "config/cron-schedules.json",
  "config/operations-policy.json",
  "scripts/check-cron-jobs.ps1",
  "src/main.js",
  "src/test.js"
];

await Promise.all(files.map((relativePath) => readFile(path.join(rootDirectory, relativePath), "utf8")));

const vercelConfig = await readFile(path.join(rootDirectory, "vercel.json"), "utf8");
const cronAuth = await readFile(path.join(rootDirectory, "lib/cron-auth.js"), "utf8");
const missing = [];

for (const token of ["\"path\": \"/api/cron/daily-report\"", "\"schedule\": \"0 5 * * *\"", "\"path\": \"/api/cron/cleanup-previews\""]) {
  if (!vercelConfig.includes(token)) {
    missing.push(token);
  }
}

for (const token of ["Bearer ${cronSecret}", "authorization ==="]) {
  if (!cronAuth.includes(token)) {
    missing.push(token);
  }
}

if (missing.length > 0) {
  throw new Error(`Cron jobs project missing tokens: ${missing.join(", ")}`);
}

console.log("Cron jobs structure looks good.");

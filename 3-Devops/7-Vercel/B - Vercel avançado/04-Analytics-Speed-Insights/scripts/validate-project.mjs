import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(currentDirectory, "..");

const files = [
  "README.md",
  "package.json",
  "vercel.json",
  "next.config.js",
  "app/layout.jsx",
  "app/page.jsx",
  "app/globals.css",
  "components/metric-card.jsx",
  "components/performance-banner.jsx",
  "lib/metrics-targets.js",
  "config/event-map.json",
  "config/performance-thresholds.json",
  "scripts/check-analytics-speed.ps1",
  "src/main.js",
  "src/test.js"
];

await Promise.all(files.map((relativePath) => readFile(path.join(rootDirectory, relativePath), "utf8")));

const layout = await readFile(path.join(rootDirectory, "app/layout.jsx"), "utf8");
const packageJson = await readFile(path.join(rootDirectory, "package.json"), "utf8");
const missing = [];

for (const token of ["@vercel/analytics/react", "@vercel/speed-insights/next", "<Analytics />", "<SpeedInsights />"]) {
  if (!layout.includes(token)) {
    missing.push(token);
  }
}

for (const token of ["\"@vercel/analytics\"", "\"@vercel/speed-insights\"", "\"next\""]) {
  if (!packageJson.includes(token)) {
    missing.push(token);
  }
}

if (missing.length > 0) {
  throw new Error(`Analytics and speed insights project missing tokens: ${missing.join(", ")}`);
}

console.log("Analytics and speed insights structure looks good.");

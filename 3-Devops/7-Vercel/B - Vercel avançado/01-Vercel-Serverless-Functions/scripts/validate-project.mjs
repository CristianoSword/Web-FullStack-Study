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
  "api/products.js",
  "api/orders.js",
  "lib/catalog.js",
  "lib/orders.js",
  "lib/response.js",
  "config/route-map.json",
  "config/runtime-profile.json",
  "scripts/check-serverless-functions.ps1",
  "src/main.js",
  "src/test.js"
];

await Promise.all(files.map((relativePath) => readFile(path.join(rootDirectory, relativePath), "utf8")));

const orders = await readFile(path.join(rootDirectory, "api/orders.js"), "utf8");
const products = await readFile(path.join(rootDirectory, "api/products.js"), "utf8");
const missing = [];

for (const token of ["validateOrderPayload", "createOrderSummary", "Only POST is supported"]) {
  if (!orders.includes(token)) {
    missing.push(token);
  }
}

for (const token of ["request.query?.slug", "catalog.find", "Only GET is supported"]) {
  if (!products.includes(token)) {
    missing.push(token);
  }
}

if (missing.length > 0) {
  throw new Error(`Serverless functions project missing tokens: ${missing.join(", ")}`);
}

console.log("Serverless functions structure looks good.");

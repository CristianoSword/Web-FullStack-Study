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
  "middleware.js",
  "lib/geo-policy.js",
  "public/index.html",
  "public/blocked.html",
  "public/styles.css",
  "public/assets/status.txt",
  "config/geo-rules.json",
  "config/middleware-profile.json",
  "scripts/check-geo-block.ps1",
  "src/main.js",
  "src/test.js"
];

await Promise.all(files.map((relativePath) => readFile(path.join(rootDirectory, relativePath), "utf8")));

const middleware = await readFile(path.join(rootDirectory, "middleware.js"), "utf8");
const policy = await readFile(path.join(rootDirectory, "lib/geo-policy.js"), "utf8");
const missing = [];

for (const token of ["NextResponse.redirect", "x-geo-decision", "matcher: [\"/((?!assets|blocked.html|favicon.ico).*)\"]"]) {
  if (!middleware.includes(token)) {
    missing.push(token);
  }
}

for (const token of ["blocked-country", "outside-allowlist", "allowed-country"]) {
  if (!policy.includes(token)) {
    missing.push(token);
  }
}

if (missing.length > 0) {
  throw new Error(`Geo block project missing tokens: ${missing.join(", ")}`);
}

console.log("Edge middleware geo block structure looks good.");

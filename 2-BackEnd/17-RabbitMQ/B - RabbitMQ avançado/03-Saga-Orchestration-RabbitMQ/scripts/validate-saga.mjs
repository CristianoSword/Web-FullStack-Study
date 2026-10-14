import fs from "node:fs";
import path from "node:path";

const requiredFiles = [
  "package.json",
  "docker-compose.yml",
  "config/runtime-config.mjs",
  "src/server.mjs"
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.resolve(file)));

if (missing.length > 0) {
  console.error("Missing files:", missing.join(", "));
  process.exit(1);
}

console.log("Saga scaffold looks consistent.");

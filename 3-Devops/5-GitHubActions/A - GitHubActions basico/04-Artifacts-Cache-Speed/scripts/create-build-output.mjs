import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.resolve(root, "dist");
fs.mkdirSync(dist, { recursive: true });

const payload = {
  generatedAt: new Date().toISOString(),
  artifact: "build-report",
  cache: "~/.npm",
  status: "ready"
};

fs.writeFileSync(path.resolve(dist, "build-report.json"), JSON.stringify(payload, null, 2));
console.log("Build report generated.");

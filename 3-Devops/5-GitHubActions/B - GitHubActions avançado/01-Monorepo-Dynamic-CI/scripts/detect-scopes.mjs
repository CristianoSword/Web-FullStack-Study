import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const packages = JSON.parse(fs.readFileSync(path.resolve(root, "config/monorepo-packages.json"), "utf8"));
const changedFiles = JSON.parse(fs.readFileSync(path.resolve(root, "samples/changed-files.json"), "utf8"));

const affected = packages.filter((pkg) => changedFiles.some((file) => file.startsWith(pkg.path)));
const matrix = affected.map((pkg) => ({
  scope: pkg.scope,
  path: pkg.path,
  command: pkg.command
}));

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `matrix=${JSON.stringify(matrix)}\n`);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `has_changes=${String(matrix.length > 0)}\n`);
}

console.log(JSON.stringify({ matrix, hasChanges: matrix.length > 0 }, null, 2));

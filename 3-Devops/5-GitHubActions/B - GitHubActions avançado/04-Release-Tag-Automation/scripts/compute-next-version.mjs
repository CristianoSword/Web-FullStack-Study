import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const spec = JSON.parse(fs.readFileSync(path.resolve(root, "config/release-spec.json"), "utf8"));
const bump = process.env.BUMP ?? "patch";

const [major, minor, patch] = spec.baseVersion.split(".").map(Number);
let nextVersion = spec.baseVersion;

if (bump === "major") {
  nextVersion = `${major + 1}.0.0`;
} else if (bump === "minor") {
  nextVersion = `${major}.${minor + 1}.0`;
} else {
  nextVersion = `${major}.${minor}.${patch + 1}`;
}

const tagName = `${spec.tagPrefix}${nextVersion}`;

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `next_version=${nextVersion}\n`);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `tag_name=${tagName}\n`);
}

console.log(JSON.stringify({ bump, nextVersion, tagName }, null, 2));

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const commits = JSON.parse(fs.readFileSync(path.resolve(root, "samples/commit-history.json"), "utf8"));

const lines = ["## Release Notes", ""];
for (const commit of commits) {
  lines.push(`- ${commit.type}: ${commit.message} (${commit.sha})`);
}

fs.writeFileSync(path.resolve(root, "changelog/release-notes.md"), `${lines.join("\n")}\n`);
console.log("Release notes rendered.");

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  ".github/workflows/release-tag-automation.yml",
  "config/release-spec.json",
  "samples/commit-history.json",
  "changelog/release-notes.md",
  "scripts/compute-next-version.mjs",
  "scripts/render-changelog.mjs",
  "src/main.js",
  "src/test.js",
  "src/models/release-spec.model.js",
  "src/models/commit-entry.model.js",
  "src/services/release-plan.service.js",
  "src/services/release-summary.service.js"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const workflow = fs.readFileSync(path.resolve(root, ".github/workflows/release-tag-automation.yml"), "utf8");
for (const token of [
  "workflow_dispatch:",
  "actions/upload-artifact@v4",
  "actions/download-artifact@v4",
  "softprops/action-gh-release@v2",
  "git tag ${{ needs.prepare-release.outputs.tag_name }}",
  "draft: true"
]) {
  if (!workflow.includes(token)) {
    throw new Error(`Release workflow missing token: ${token}`);
  }
}

const versionScript = fs.readFileSync(path.resolve(root, "scripts/compute-next-version.mjs"), "utf8");
for (const token of ["next_version=", "tag_name=", "major", "minor", "patch"]) {
  if (!versionScript.includes(token)) {
    throw new Error(`Version script missing token: ${token}`);
  }
}

console.log("Release Tag Automation workflow validation passed.");

import assert from "node:assert/strict";

import { ReleasePlanService } from "./services/release-plan.service.js";
import { ReleaseSummaryService } from "./services/release-summary.service.js";

const spec = {
  workflowName: "Release Tag Automation",
  baseVersion: "2.4.3",
  defaultBranch: "main",
  tagPrefix: "v",
  allowedBumps: ["patch", "minor", "major"]
};

const commits = [
  { sha: "a1b2c3d", type: "feat", message: "feat(api): add release endpoint" },
  { sha: "d4e5f6g", type: "fix", message: "fix(ci): correct docker cache key" }
];

try {
  const plan = new ReleasePlanService({ spec, commits }).buildPlan();
  assert.equal(plan.baseVersion, "2.4.3");
  assert.ok(plan.steps.includes("create-github-release"));

  const summary = new ReleaseSummaryService({ spec, commits }).buildSummary();
  assert.equal(summary.commitCount, 2);
  assert.equal(summary.tagExample, "v2.4.4");

  console.log("Release Tag Automation lab tests passed.");
} catch (error) {
  console.error("Release Tag Automation lab tests failed:", error);
  process.exit(1);
}

import assert from "node:assert/strict";

import { LintWorkflowPlanService } from "./services/lint-workflow-plan.service.js";
import { ReportSummaryService } from "./services/report-summary.service.js";

const targets = {
  extensions: [".js"],
  include: ["src/**/*.js", "scripts/**/*.mjs", "eslint.config.js"],
  severity: "error",
  nodeVersions: ["18", "20"]
};

try {
  const plan = new LintWorkflowPlanService({ targets }).buildPlan();
  assert.deepEqual(plan.nodeVersions, ["18", "20"]);
  assert.ok(plan.steps.includes("run-eslint"));

  const summary = new ReportSummaryService({ targets }).buildSummary();
  assert.equal(summary.totalTargets, 3);
  assert.equal(summary.severity, "error");

  console.log("Linter automated check lab tests passed.");
} catch (error) {
  console.error("Linter automated check lab tests failed:", error);
  process.exit(1);
}

import assert from "node:assert/strict";

import { ConditionalPlanService } from "./services/conditional-plan.service.js";
import { ConditionalSummaryService } from "./services/conditional-summary.service.js";

const spec = {
  workflowName: "Conditional Steps Exec",
  inputs: ["run_tests", "deploy_preview"],
  defaultBranch: "main",
  validationOutput: "is_valid"
};

try {
  const plan = new ConditionalPlanService({ spec }).buildPlan();
  assert.equal(plan.workflowName, "Conditional Steps Exec");
  assert.ok(plan.conditions.includes("deploy-preview-when-valid"));

  const summary = new ConditionalSummaryService({ spec }).buildSummary();
  assert.equal(summary.validationOutput, "is_valid");
  assert.equal(summary.inputs.length, 2);

  console.log("Conditional Steps Exec lab tests passed.");
} catch (error) {
  console.error("Conditional Steps Exec lab tests failed:", error);
  process.exit(1);
}

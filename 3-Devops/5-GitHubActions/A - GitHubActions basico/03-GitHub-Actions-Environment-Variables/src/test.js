import assert from "node:assert/strict";

import { EnvironmentPlanService } from "./services/environment-plan.service.js";
import { SummaryOutputService } from "./services/summary-output.service.js";

const spec = {
  workflowName: "Environment Variables Study",
  jobEnvironment: "development",
  variables: [
    { name: "APP_ENV", scope: "job", exampleValue: "development" },
    { name: "API_BASE_URL", scope: "job", exampleValue: "https://api.study.local" },
    { name: "DEPLOY_NOTE", scope: "step", exampleValue: "preview-check" }
  ],
  secretName: "DEMO_TOKEN"
};

try {
  const plan = new EnvironmentPlanService({ spec }).buildPlan();
  assert.equal(plan.workflowName, "Environment Variables Study");
  assert.equal(plan.variables.length, 3);

  const summary = new SummaryOutputService({ spec }).buildSummary();
  assert.equal(summary.secretName, "DEMO_TOKEN");
  assert.ok(summary.outputKeys.includes("api_url"));

  console.log("Environment Variables workflow lab tests passed.");
} catch (error) {
  console.error("Environment Variables workflow lab tests failed:", error);
  process.exit(1);
}

import assert from "node:assert/strict";

import { ConsumerSummaryService } from "./services/consumer-summary.service.js";
import { CustomActionPlanService } from "./services/custom-action-plan.service.js";

const spec = {
  name: "study-release-note",
  displayName: "Study Release Note Action",
  main: "src/index.js",
  inputs: [
    { name: "title", required: true },
    { name: "environment", required: true }
  ],
  outputs: ["summary", "slug"]
};

const sampleInputs = {
  title: "Deploy Production",
  environment: "production"
};

try {
  const plan = new CustomActionPlanService({ spec, sampleInputs }).buildPlan();
  assert.equal(plan.actionName, "study-release-note");
  assert.ok(plan.outputs.includes("slug"));

  const summary = new ConsumerSummaryService({ spec, sampleInputs }).buildSummary();
  assert.equal(summary.inputs.title, "Deploy Production");
  assert.equal(summary.expectedOutputs[0], "summary");

  console.log("Custom Action Development lab tests passed.");
} catch (error) {
  console.error("Custom Action Development lab tests failed:", error);
  process.exit(1);
}

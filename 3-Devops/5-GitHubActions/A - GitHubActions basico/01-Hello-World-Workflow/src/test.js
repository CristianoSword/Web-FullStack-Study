import assert from "node:assert/strict";

import { HelloWorkflowPlanService } from "./services/hello-workflow-plan.service.js";
import { SummaryTemplateService } from "./services/summary-template.service.js";

const spec = {
  workflowName: "hello-world-study",
  displayName: "Hello World Study Workflow",
  defaultBranches: ["main", "dev"],
  messageTemplate: "Hello {actor}, workflow triggered by {eventName} on {refName}.",
  nodeVersion: "20"
};

const context = {
  actor: "study-user",
  eventName: "workflow_dispatch",
  refName: "main",
  note: "manual-run"
};

try {
  const plan = new HelloWorkflowPlanService({ spec, context }).buildPlan();
  assert.equal(plan.workflowName, "hello-world-study");
  assert.ok(plan.steps.includes("render-greeting"));

  const summary = new SummaryTemplateService({ context }).buildSummary();
  assert.equal(summary.actor, "study-user");
  assert.equal(summary.eventName, "workflow_dispatch");

  console.log("Hello World workflow lab tests passed.");
} catch (error) {
  console.error("Hello World workflow lab tests failed:", error);
  process.exit(1);
}

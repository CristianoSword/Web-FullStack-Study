import assert from "node:assert/strict";

import { SlackAlertPlanService } from "./services/slack-alert-plan.service.js";
import { SlackSummaryService } from "./services/slack-summary.service.js";

const spec = {
  workflowName: "Slack Webhook Alerts",
  severity: "high",
  channelLabel: "#platform-alerts",
  webhookSecret: "SLACK_WEBHOOK_URL",
  title: "Deployment Failure",
  environment: "production"
};

const failureEvent = {
  workflow: "deploy-platform",
  job: "deploy-production",
  status: "failure",
  repository: "CristianoSword/Web-FullStack-Study",
  runUrl: "https://github.com/CristianoSword/Web-FullStack-Study/actions/runs/123456",
  commit: "abc123def456",
  environment: "production"
};

try {
  const plan = new SlackAlertPlanService({ spec, failureEvent }).buildPlan();
  assert.equal(plan.workflowName, "Slack Webhook Alerts");
  assert.ok(plan.steps.includes("send-slack-webhook"));

  const summary = new SlackSummaryService({ spec, failureEvent }).buildSummary();
  assert.equal(summary.webhookSecret, "SLACK_WEBHOOK_URL");
  assert.equal(summary.runUrl, failureEvent.runUrl);

  console.log("Slack Webhook Alerts lab tests passed.");
} catch (error) {
  console.error("Slack Webhook Alerts lab tests failed:", error);
  process.exit(1);
}

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  ".github/workflows/slack-webhook-alerts.yml",
  "config/slack-alert-spec.json",
  "samples/failure-event.json",
  "payloads/slack-alert.json",
  "scripts/render-slack-payload.mjs",
  "src/main.js",
  "src/test.js",
  "src/models/slack-alert.model.js",
  "src/models/failure-event.model.js",
  "src/services/slack-alert-plan.service.js",
  "src/services/slack-summary.service.js"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const workflow = fs.readFileSync(path.resolve(root, ".github/workflows/slack-webhook-alerts.yml"), "utf8");
for (const token of [
  "if: ${{ failure() }}",
  "SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}",
  "--data @payloads/slack-alert.json",
  "if: ${{ always() }}",
  "node scripts/render-slack-payload.mjs"
]) {
  if (!workflow.includes(token)) {
    throw new Error(`Slack workflow missing token: ${token}`);
  }
}

const payloadScript = fs.readFileSync(path.resolve(root, "scripts/render-slack-payload.mjs"), "utf8");
for (const token of ["blocks", "failureEvent.workflow", "payloads/slack-alert.json"]) {
  if (!payloadScript.includes(token)) {
    throw new Error(`Payload renderer missing token: ${token}`);
  }
}

console.log("Slack Webhook Alerts workflow validation passed.");

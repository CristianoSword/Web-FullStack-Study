import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { SlackAlertPlanService } from "./services/slack-alert-plan.service.js";
import { SlackSummaryService } from "./services/slack-summary.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const spec = JSON.parse(fs.readFileSync(path.resolve(root, "config/slack-alert-spec.json"), "utf8"));
const failureEvent = JSON.parse(fs.readFileSync(path.resolve(root, "samples/failure-event.json"), "utf8"));

const command = process.argv[2] ?? "plan";
const payload = command === "summary"
  ? new SlackSummaryService({ spec, failureEvent }).buildSummary()
  : new SlackAlertPlanService({ spec, failureEvent }).buildPlan();

console.log(JSON.stringify(payload, null, 2));

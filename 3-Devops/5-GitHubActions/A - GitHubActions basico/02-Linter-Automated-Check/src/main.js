import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { LintWorkflowPlanService } from "./services/lint-workflow-plan.service.js";
import { ReportSummaryService } from "./services/report-summary.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const targets = JSON.parse(fs.readFileSync(path.resolve(root, "config/lint-targets.json"), "utf8"));

const command = process.argv[2] ?? "plan";
let payload;

if (command === "plan") {
  payload = new LintWorkflowPlanService({ targets }).buildPlan();
} else if (command === "report") {
  payload = new ReportSummaryService({ targets }).buildSummary();
} else {
  console.error("Supported commands: plan, report");
  process.exit(1);
}

console.log(JSON.stringify(payload, null, 2));

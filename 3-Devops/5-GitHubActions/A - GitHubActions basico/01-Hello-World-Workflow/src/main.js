import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { GreetingContextModel } from "./models/greeting-context.model.js";
import { HelloWorkflowPlanService } from "./services/hello-workflow-plan.service.js";
import { SummaryTemplateService } from "./services/summary-template.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const spec = JSON.parse(fs.readFileSync(path.resolve(root, "config/workflow-spec.json"), "utf8"));

const context = new GreetingContextModel({
  actor: "study-user",
  eventName: "workflow_dispatch",
  refName: "main",
  note: "local-preview"
});

const command = process.argv[2] ?? "plan";
let payload;

if (command === "plan") {
  payload = new HelloWorkflowPlanService({ spec, context }).buildPlan();
} else if (command === "summary") {
  payload = new SummaryTemplateService({ context }).buildSummary();
} else {
  console.error("Supported commands: plan, summary");
  process.exit(1);
}

console.log(JSON.stringify(payload, null, 2));

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { NodeportPlanService } from "./services/nodeport-plan.service.js";
import { ServiceSummaryService } from "./services/service-summary.service.js";
import { SmokeCheckService } from "./services/smoke-check.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const serviceSpec = JSON.parse(fs.readFileSync(path.resolve(root, "config/service-spec.json"), "utf8"));
const accessFlow = JSON.parse(fs.readFileSync(path.resolve(root, "config/access-flow.json"), "utf8"));

const command = process.argv[2] ?? "plan";
let payload;

if (command === "plan") {
  payload = new NodeportPlanService({ serviceSpec, accessFlow }).buildPlan();
} else if (command === "service") {
  payload = new ServiceSummaryService({ serviceSpec, accessFlow }).buildSummary();
} else if (command === "smoke") {
  payload = new SmokeCheckService({ serviceSpec }).buildPlan();
} else {
  console.error("Supported commands: plan, service, smoke");
  process.exit(1);
}

console.log(JSON.stringify(payload, null, 2));

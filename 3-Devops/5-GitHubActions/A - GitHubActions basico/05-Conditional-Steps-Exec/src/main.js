import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ConditionalPlanService } from "./services/conditional-plan.service.js";
import { ConditionalSummaryService } from "./services/conditional-summary.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const spec = JSON.parse(fs.readFileSync(path.resolve(root, "config/condition-spec.json"), "utf8"));

const command = process.argv[2] ?? "plan";
const payload = command === "summary"
  ? new ConditionalSummaryService({ spec }).buildSummary()
  : new ConditionalPlanService({ spec }).buildPlan();

console.log(JSON.stringify(payload, null, 2));

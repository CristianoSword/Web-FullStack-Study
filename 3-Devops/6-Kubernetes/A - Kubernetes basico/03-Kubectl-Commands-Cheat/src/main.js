import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { CheatsheetSummaryService } from "./services/cheatsheet-summary.service.js";
import { CommandPlanService } from "./services/command-plan.service.js";
import { SmokeCheckService } from "./services/smoke-check.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const context = JSON.parse(fs.readFileSync(path.resolve(root, "config/cluster-context.json"), "utf8"));
const groups = JSON.parse(fs.readFileSync(path.resolve(root, "config/command-groups.json"), "utf8"));

const command = process.argv[2] ?? "plan";
let payload;

if (command === "plan") {
  payload = new CommandPlanService({ context, groups }).buildPlan();
} else if (command === "cheat") {
  payload = new CheatsheetSummaryService({ groups }).buildSummary();
} else if (command === "smoke") {
  payload = new SmokeCheckService({ context }).buildPlan();
} else {
  console.error("Supported commands: plan, cheat, smoke");
  process.exit(1);
}

console.log(JSON.stringify(payload, null, 2));

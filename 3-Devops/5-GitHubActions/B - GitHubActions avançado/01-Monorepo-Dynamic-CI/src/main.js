import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { MonorepoPlanService } from "./services/monorepo-plan.service.js";
import { ScopeSummaryService } from "./services/scope-summary.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const packages = JSON.parse(fs.readFileSync(path.resolve(root, "config/monorepo-packages.json"), "utf8"));
const changedFiles = JSON.parse(fs.readFileSync(path.resolve(root, "samples/changed-files.json"), "utf8"));

const command = process.argv[2] ?? "plan";
const payload = command === "summary"
  ? new ScopeSummaryService({ packages, changedFiles }).buildSummary()
  : new MonorepoPlanService({ packages, changedFiles }).buildPlan();

console.log(JSON.stringify(payload, null, 2));

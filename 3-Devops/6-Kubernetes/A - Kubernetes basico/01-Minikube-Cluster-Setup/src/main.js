import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ManifestSummaryService } from "./services/manifest-summary.service.js";
import { MinikubePlanService } from "./services/minikube-plan.service.js";
import { SmokeCheckService } from "./services/smoke-check.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const profile = JSON.parse(fs.readFileSync(path.resolve(root, "config/minikube-profile.json"), "utf8"));
const addons = JSON.parse(fs.readFileSync(path.resolve(root, "config/addons.json"), "utf8"));

const command = process.argv[2] ?? "plan";
let payload;

if (command === "plan") {
  payload = new MinikubePlanService({ profile, addons }).buildPlan();
} else if (command === "manifests") {
  payload = new ManifestSummaryService().buildSummary();
} else if (command === "smoke") {
  payload = new SmokeCheckService({ profile }).buildPlan();
} else {
  console.error("Supported commands: plan, manifests, smoke");
  process.exit(1);
}

console.log(JSON.stringify(payload, null, 2));

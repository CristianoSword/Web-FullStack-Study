import assert from "node:assert/strict";

import { CheatsheetSummaryService } from "./services/cheatsheet-summary.service.js";
import { CommandPlanService } from "./services/command-plan.service.js";
import { SmokeCheckService } from "./services/smoke-check.service.js";

const context = {
  namespace: "study-cheat",
  appName: "cheat-web",
  deploymentName: "cheat-web-deployment",
  serviceName: "cheat-web-service",
  labelSelector: "app=cheat-web"
};

const groups = [
  { name: "inspection", commands: ["kubectl get pods -n study-cheat"] },
  { name: "debugging", commands: ["kubectl logs deployment/cheat-web-deployment -n study-cheat"] },
  { name: "operations", commands: ["kubectl scale deployment cheat-web-deployment --replicas=3 -n study-cheat"] }
];

try {
  const plan = new CommandPlanService({ context, groups }).buildPlan();
  assert.equal(plan.namespace, "study-cheat");
  assert.equal(plan.groups.length, 3);

  const cheat = new CheatsheetSummaryService({ groups }).buildSummary();
  assert.equal(cheat.totalGroups, 3);
  assert.ok(cheat.totalCommands >= 3);

  const smoke = new SmokeCheckService({ context }).buildPlan();
  assert.equal(smoke[0].name, "get-pods");
  assert.equal(smoke.at(-1).name, "rollout-status");

  console.log("Kubectl Commands Cheat lab tests passed.");
} catch (error) {
  console.error("Kubectl Commands Cheat lab tests failed:", error);
  process.exit(1);
}

import assert from "node:assert/strict";

import { MonorepoPlanService } from "./services/monorepo-plan.service.js";
import { ScopeSummaryService } from "./services/scope-summary.service.js";

const packages = [
  { scope: "frontend", path: "apps/frontend/", command: "npm run test --workspace frontend" },
  { scope: "api", path: "apps/api/", command: "npm run test --workspace api" },
  { scope: "shared", path: "packages/shared/", command: "npm run test --workspace @study/shared" }
];

const changedFiles = [
  "apps/frontend/src/App.jsx",
  "packages/shared/src/date.js"
];

try {
  const plan = new MonorepoPlanService({ packages, changedFiles }).buildPlan();
  assert.equal(plan.affectedScopes.length, 2);
  assert.ok(plan.affectedScopes.includes("frontend"));

  const summary = new ScopeSummaryService({ packages, changedFiles }).buildSummary();
  assert.equal(summary.changedFiles.length, 2);
  assert.equal(summary.affectedPackages[1].scope, "shared");

  console.log("Monorepo Dynamic CI lab tests passed.");
} catch (error) {
  console.error("Monorepo Dynamic CI lab tests failed:", error);
  process.exit(1);
}

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { IngressSpec } from "./models/ingress-spec.model.js";
import { RoutingSmokePlan } from "./models/routing-smoke-plan.model.js";
import { buildRoutingPlan } from "./services/routing-plan.service.js";
import { summarizeIngress } from "./services/ingress-summary.service.js";
import { createIngressChecks } from "./services/ingress-checks.service.js";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(currentDirectory, "..");

const ingressSpec = IngressSpec.from(
  JSON.parse(await readFile(path.join(rootDirectory, "config/ingress-spec.json"), "utf8"))
);
const smokePlan = RoutingSmokePlan.from(
  JSON.parse(await readFile(path.join(rootDirectory, "config/routing-smoke-plan.json"), "utf8"))
);

const plan = buildRoutingPlan(ingressSpec, smokePlan);
const summary = summarizeIngress(ingressSpec);
const checks = createIngressChecks(smokePlan);

console.log(JSON.stringify({ summary, plan, checks }, null, 2));

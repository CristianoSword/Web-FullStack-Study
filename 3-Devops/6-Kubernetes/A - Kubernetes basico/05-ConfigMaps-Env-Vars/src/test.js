import assert from "node:assert/strict";

import { ConfigmapPlanService } from "./services/configmap-plan.service.js";
import { ConfigmapSummaryService } from "./services/configmap-summary.service.js";
import { SmokeCheckService } from "./services/smoke-check.service.js";

const spec = {
  namespace: "study-config",
  appName: "config-web",
  configMapName: "config-web-settings",
  serviceName: "config-web-service",
  deploymentName: "config-web-deployment",
  image: "nginx:1.27-alpine",
  data: {
    APP_NAME: "config-web",
    APP_ENV: "local",
    LOG_LEVEL: "debug",
    WELCOME_MESSAGE: "hello-from-configmap"
  }
};

const mappings = [
  { envName: "APP_NAME", sourceKey: "APP_NAME" },
  { envName: "APP_ENV", sourceKey: "APP_ENV" },
  { envName: "WELCOME_MESSAGE", sourceKey: "WELCOME_MESSAGE" }
];

try {
  const plan = new ConfigmapPlanService({ spec, mappings }).buildPlan();
  assert.equal(plan.configMap.configMapName, "config-web-settings");
  assert.equal(plan.mappings.length, 3);

  const summary = new ConfigmapSummaryService({ spec, mappings }).buildSummary();
  assert.equal(summary.namespace, "study-config");
  assert.ok(summary.keys.includes("WELCOME_MESSAGE"));

  const smoke = new SmokeCheckService({ spec }).buildPlan();
  assert.equal(smoke[0].name, "rollout");
  assert.equal(smoke.at(-1).name, "inspect-configmap");

  console.log("ConfigMaps Env Vars lab tests passed.");
} catch (error) {
  console.error("ConfigMaps Env Vars lab tests failed:", error);
  process.exit(1);
}

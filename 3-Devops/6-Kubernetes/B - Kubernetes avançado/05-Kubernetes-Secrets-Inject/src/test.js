import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SecretSpec } from "./models/secret-spec.model.js";
import { SecretAccessPolicy } from "./models/secret-access-policy.model.js";
import { buildSecretPlan } from "./services/secret-plan.service.js";
import { summarizeSecretInjection } from "./services/secret-summary.service.js";
import { createSecretChecks } from "./services/secret-checks.service.js";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(currentDirectory, "..");

const secretSpec = SecretSpec.from(
  JSON.parse(await readFile(path.join(rootDirectory, "config/secret-spec.json"), "utf8"))
);
const accessPolicy = SecretAccessPolicy.from(
  JSON.parse(await readFile(path.join(rootDirectory, "config/secret-access-policy.json"), "utf8"))
);

const plan = buildSecretPlan(secretSpec, accessPolicy);
const summary = summarizeSecretInjection(secretSpec, accessPolicy);
const checks = createSecretChecks();

assert.equal(summary.secretName, "payments-api-secret");
assert.equal(summary.namespace, "study-secrets");
assert.equal(plan.mountPath, "/var/run/secrets/app");
assert.equal(plan.envKeys.length, 2);
assert.equal(plan.fileKeys[0], "signing-token");
assert.deepEqual(checks, [
  "rollout-ready",
  "env-secret-injected",
  "file-secret-mounted",
  "configmap-still-separate",
  "secret-describe-reviewed"
]);

console.log("Secrets injection lab tests passed.");

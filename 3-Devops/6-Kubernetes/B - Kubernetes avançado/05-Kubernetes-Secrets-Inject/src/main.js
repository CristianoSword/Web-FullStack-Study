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

console.log(JSON.stringify({ summary, plan, checks }, null, 2));

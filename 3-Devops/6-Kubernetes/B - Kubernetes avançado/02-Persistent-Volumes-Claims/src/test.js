import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { StorageSpec } from "./models/storage-spec.model.js";
import { BackupPolicy } from "./models/backup-policy.model.js";
import { buildStoragePlan } from "./services/storage-plan.service.js";
import { summarizeStatefulTopology } from "./services/stateful-topology.service.js";
import { createStorageChecks } from "./services/storage-checks.service.js";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(currentDirectory, "..");

const storageSpec = StorageSpec.from(
  JSON.parse(await readFile(path.join(rootDirectory, "config/storage-spec.json"), "utf8"))
);
const backupPolicy = BackupPolicy.from(
  JSON.parse(await readFile(path.join(rootDirectory, "config/backup-policy.json"), "utf8"))
);

const topology = summarizeStatefulTopology(storageSpec, backupPolicy);
const plan = buildStoragePlan(storageSpec, backupPolicy);
const checks = createStorageChecks(storageSpec);

assert.equal(topology.namespace, "study-storage");
assert.equal(topology.claimName, "notes-pvc");
assert.equal(plan.persistentVolume.capacity, "2Gi");
assert.equal(plan.workload.kind, "StatefulSet");
assert.equal(plan.backup.schedule, "0 */6 * * *");
assert.deepEqual(checks, [
  "statefulset-rollout",
  "claim-bound",
  "volume-mounted",
  "file-present",
  "headless-service-ready"
]);

console.log("Persistent volumes lab tests passed.");

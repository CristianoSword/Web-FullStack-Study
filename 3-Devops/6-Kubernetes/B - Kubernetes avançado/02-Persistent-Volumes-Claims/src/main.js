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

const plan = buildStoragePlan(storageSpec, backupPolicy);
const topology = summarizeStatefulTopology(storageSpec, backupPolicy);
const checks = createStorageChecks(storageSpec);

console.log(JSON.stringify({ topology, plan, checks }, null, 2));

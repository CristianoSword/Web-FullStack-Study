import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

async function readProjectFile(relativePath) {
  return readFile(path.join(projectRoot, relativePath), "utf8");
}

function assertIncludes(content, snippet, label) {
  if (!content.includes(snippet)) {
    throw new Error(`Missing ${label}: ${snippet}`);
  }
}

const [compose, replicaInit, seed, commitTx, rollbackTx, verifyQuery, catalog] = await Promise.all([
  readProjectFile("docker-compose.yml"),
  readProjectFile("replica-set/init-replica.js"),
  readProjectFile("seed/01-init.js"),
  readProjectFile("transactions/commit-transfer.mongodb.js"),
  readProjectFile("transactions/rollback-transfer.mongodb.js"),
  readProjectFile("queries/verification.mongodb.js"),
  readProjectFile("models/transaction-catalog.json")
]);

assertIncludes(compose, "mongo1:", "primary replica service");
assertIncludes(compose, "mongo2:", "secondary replica service");
assertIncludes(compose, "mongo3:", "secondary replica service");
assertIncludes(compose, "--replSet", "replica set command");
assertIncludes(replicaInit, "rs.initiate", "replica initialization");
assertIncludes(seed, "createCollection(\"accounts\"", "accounts collection");
assertIncludes(seed, "createCollection(\"transfers\"", "transfers collection");
assertIncludes(seed, "createCollection(\"audit_logs\")", "audit log collection");
assertIncludes(commitTx, "startTransaction", "transaction session start");
assertIncludes(commitTx, "commitTransaction", "transaction commit");
assertIncludes(rollbackTx, "abortTransaction", "transaction abort");
assertIncludes(rollbackTx, "transfer_rolled_back", "rollback audit");
assertIncludes(verifyQuery, "rs.status()", "replica set verification");
assertIncludes(catalog, "commit-transfer", "catalog flow");
assertIncludes(catalog, "rollback-transfer", "catalog flow");

console.log("Replica set transaction lab structure is valid.");

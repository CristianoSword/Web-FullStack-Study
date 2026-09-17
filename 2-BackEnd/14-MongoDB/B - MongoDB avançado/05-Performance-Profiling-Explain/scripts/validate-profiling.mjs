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

const [catalog, seed, noIndexQuery, indexedQuery, sortedQuery, verification, compose] = await Promise.all([
  readProjectFile("models/profiling-catalog.json"),
  readProjectFile("seed/01-init.js"),
  readProjectFile("queries/explain-without-index.mongodb.js"),
  readProjectFile("queries/explain-with-index.mongodb.js"),
  readProjectFile("queries/explain-sorted-range.mongodb.js"),
  readProjectFile("queries/verification.mongodb.js"),
  readProjectFile("docker-compose.yml")
]);

assertIncludes(catalog, "filtered-scan-without-index", "catalog scenario");
assertIncludes(catalog, "filtered-query-with-compound-index", "catalog scenario");
assertIncludes(seed, "tenant_status_created_idx", "compound index");
assertIncludes(seed, "region_type_duration_idx", "compound index");
assertIncludes(seed, "for (let i = 1; i <= 1200; i += 1)", "seed volume");
assertIncludes(noIndexQuery, "dropIndex(\"tenant_status_created_idx\")", "drop index comparison");
assertIncludes(noIndexQuery, "explain(\"executionStats\")", "explain execution stats");
assertIncludes(indexedQuery, "createIndex(", "recreate index");
assertIncludes(indexedQuery, "explain(\"executionStats\")", "indexed explain");
assertIncludes(sortedQuery, "durationMs", "sorted range filter");
assertIncludes(verification, "$bucket", "profiling bucket summary");
assertIncludes(compose, "27028:27017", "published MongoDB port");

console.log("Performance profiling lab structure is valid.");

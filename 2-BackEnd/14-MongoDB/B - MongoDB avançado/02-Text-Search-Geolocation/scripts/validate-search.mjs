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

const [catalog, seed, textQuery, geoQuery, verificationQuery] = await Promise.all([
  readProjectFile("models/search-catalog.json"),
  readProjectFile("seed/01-init.js"),
  readProjectFile("queries/text-search.mongodb.js"),
  readProjectFile("queries/geolocation.mongodb.js"),
  readProjectFile("queries/verification.mongodb.js")
]);

assertIncludes(catalog, "\"textIndexes\"", "catalog section");
assertIncludes(catalog, "\"geoIndexes\"", "catalog section");
assertIncludes(seed, "venue_text_search", "text index");
assertIncludes(seed, "venue_location_2dsphere", "geo index");
assertIncludes(seed, "Paulista Cowork Garden", "seed venue");
assertIncludes(textQuery, "$text", "text query operator");
assertIncludes(textQuery, "textScore", "text score projection");
assertIncludes(geoQuery, "$near", "geolocation operator");
assertIncludes(geoQuery, "$geometry", "geolocation geometry");
assertIncludes(geoQuery, "$maxDistance", "geolocation radius");
assertIncludes(verificationQuery, "getIndexes", "verification index listing");

console.log("Search and geolocation lab structure is valid.");

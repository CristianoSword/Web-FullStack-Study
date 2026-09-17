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

const [catalog, seed, customerLookup, productLookup, summaryLookup, verification, compose] = await Promise.all([
  readProjectFile("models/lookup-catalog.json"),
  readProjectFile("seed/01-init.js"),
  readProjectFile("queries/orders-with-customer.mongodb.js"),
  readProjectFile("queries/orders-with-products.mongodb.js"),
  readProjectFile("queries/customer-order-summary.mongodb.js"),
  readProjectFile("queries/verification.mongodb.js"),
  readProjectFile("docker-compose.yml")
]);

assertIncludes(catalog, "orders-with-customer", "catalog flow");
assertIncludes(catalog, "orders-with-products", "catalog flow");
assertIncludes(seed, "createCollection(\"customers\"", "customers collection");
assertIncludes(seed, "createCollection(\"products\"", "products collection");
assertIncludes(seed, "createCollection(\"orders\"", "orders collection");
assertIncludes(seed, "orders_customer_id", "orders customer index");
assertIncludes(customerLookup, "$lookup", "customer lookup operator");
assertIncludes(customerLookup, "from: \"customers\"", "customer join target");
assertIncludes(productLookup, "from: \"products\"", "product join target");
assertIncludes(productLookup, "$multiply", "line total projection");
assertIncludes(summaryLookup, "$group", "summary aggregation");
assertIncludes(summaryLookup, "$size", "orders count summary");
assertIncludes(verification, "getCollectionNames", "verification collections");
assertIncludes(compose, "27027:27017", "published MongoDB port");

console.log("Lookup relationships lab structure is valid.");

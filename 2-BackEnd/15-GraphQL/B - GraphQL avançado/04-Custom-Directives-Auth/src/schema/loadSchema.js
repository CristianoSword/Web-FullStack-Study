import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadTypeDefs() {
  return readFile(path.join(__dirname, "typeDefs.graphql"), "utf8");
}

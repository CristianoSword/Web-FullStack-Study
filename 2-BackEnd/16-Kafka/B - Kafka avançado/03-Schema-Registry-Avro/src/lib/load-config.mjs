import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");

export async function loadConfig() {
  const configPath = path.join(projectRoot, "config", "registry-config.json");
  const raw = await readFile(configPath, "utf8");
  return JSON.parse(raw);
}

export async function loadSchemaFile(relativeSchemaPath) {
  const schemaPath = path.join(projectRoot, relativeSchemaPath);
  return readFile(schemaPath, "utf8");
}

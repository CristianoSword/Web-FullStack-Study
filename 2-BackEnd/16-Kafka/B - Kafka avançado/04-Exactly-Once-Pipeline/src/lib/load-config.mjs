import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");

export async function loadConfig() {
  const configPath = path.join(projectRoot, "config", "pipeline-config.json");
  const raw = await readFile(configPath, "utf8");
  const parsed = JSON.parse(raw);

  return {
    ...parsed,
    brokers: parsed.brokers ?? [parsed.broker]
  };
}

export async function loadJsonSchemaFile(relativePath) {
  const schemaPath = path.join(projectRoot, relativePath);
  const raw = await readFile(schemaPath, "utf8");
  return JSON.parse(raw);
}

export { projectRoot };

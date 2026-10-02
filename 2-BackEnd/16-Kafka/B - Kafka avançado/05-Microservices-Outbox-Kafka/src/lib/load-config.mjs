import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");

export async function loadConfig() {
  const configPath = path.join(projectRoot, "config", "outbox-config.json");
  const raw = await readFile(configPath, "utf8");
  const parsed = JSON.parse(raw);

  return {
    ...parsed,
    brokers: parsed.brokers ?? [parsed.broker],
    databasePath: path.resolve(projectRoot, parsed.databasePath)
  };
}

export async function loadSchemaFile(relativePath) {
  const filePath = path.join(projectRoot, relativePath);
  return readFile(filePath, "utf8");
}

export { projectRoot };

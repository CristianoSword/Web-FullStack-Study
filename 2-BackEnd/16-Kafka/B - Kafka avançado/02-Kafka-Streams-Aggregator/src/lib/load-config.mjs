import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");

export async function loadConfig() {
  const configPath = path.join(projectRoot, "config", "aggregator-config.json");
  const raw = await readFile(configPath, "utf8");
  return JSON.parse(raw);
}

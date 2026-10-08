import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");

export async function loadConfig() {
  const configPath = path.join(projectRoot, "config", "retry-config.json");
  const raw = await readFile(configPath, "utf8");
  return JSON.parse(raw);
}

export async function loadTopology() {
  const topologyPath = path.join(projectRoot, "topology", "definitions.json");
  const raw = await readFile(topologyPath, "utf8");
  return JSON.parse(raw);
}

export { projectRoot };

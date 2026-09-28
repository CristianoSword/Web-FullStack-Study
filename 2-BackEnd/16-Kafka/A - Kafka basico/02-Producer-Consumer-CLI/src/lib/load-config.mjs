import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");

export async function loadConfig() {
  const configPath = path.join(projectRoot, "config", "topic-config.json");
  const raw = await readFile(configPath, "utf8");
  return JSON.parse(raw);
}

export async function loadJsonFile(relativePath) {
  const filePath = path.join(projectRoot, relativePath);
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}

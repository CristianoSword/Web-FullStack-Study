const fs = require("fs/promises");
const { LOG_DIR, LOG_FILE } = require("../config");
const { buildEntry } = require("../models/log-schema");

async function ensureLogDir() {
  await fs.mkdir(LOG_DIR, { recursive: true });
}

async function appendLog(payload) {
  await ensureLogDir();
  const entry = buildEntry(payload);
  await fs.appendFile(LOG_FILE, `${JSON.stringify(entry)}\n`, "utf8");
  return entry;
}

async function readLogs() {
  try {
    const content = await fs.readFile(LOG_FILE, "utf8");
    return content
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line));
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function summarizeLogs() {
  const entries = await readLogs();

  return entries.reduce(
    (acc, entry) => {
      acc.total += 1;
      acc.byLevel[entry.level] = (acc.byLevel[entry.level] ?? 0) + 1;
      return acc;
    },
    { total: 0, byLevel: {} }
  );
}

module.exports = {
  appendLog,
  readLogs,
  summarizeLogs,
};

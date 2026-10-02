import { mkdir } from "node:fs/promises";
import path from "node:path";

import Database from "better-sqlite3";

export async function openDatabase({ databasePath, schemaSql }) {
  await mkdir(path.dirname(databasePath), { recursive: true });

  const database = new Database(databasePath);
  database.pragma("journal_mode = WAL");
  database.pragma("foreign_keys = ON");
  database.exec(schemaSql);

  return database;
}

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import initSqlJs from "sql.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");

function splitStatements(sql) {
  return sql
    .split(";")
    .map((statement) => statement.trim())
    .filter(Boolean);
}

function createTracker() {
  return {
    executedQueries: 0,
    recentStatements: [],
    log(statement) {
      this.executedQueries += 1;
      this.recentStatements.unshift(statement.replace(/\s+/g, " ").trim());
      this.recentStatements = this.recentStatements.slice(0, 12);
    }
  };
}

function mapRows(result) {
  if (!result) {
    return [];
  }

  return result.values.map((row) =>
    Object.fromEntries(result.columns.map((column, index) => [column, row[index]]))
  );
}

export async function createDatabase() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();
  const tracker = createTracker();

  const [schemaSql, seedSql] = await Promise.all([
    readFile(path.join(projectRoot, "sql", "schema.sql"), "utf8"),
    readFile(path.join(projectRoot, "sql", "seed.sql"), "utf8")
  ]);

  for (const statement of [...splitStatements(schemaSql), ...splitStatements(seedSql)]) {
    db.run(statement);
  }

  return {
    queryTracker: tracker,
    all(sql, params = []) {
      tracker.log(sql);
      const result = db.exec(sql, params)[0];
      return mapRows(result);
    },
    get(sql, params = []) {
      return this.all(sql, params)[0] ?? null;
    }
  };
}

import { createDatabaseUrlReport } from "../models/database-url.model.js";

export class DatabaseUrlInspectorService {
  constructor({ env = process.env }) {
    this.env = env;
  }

  inspect() {
    const originalUrl = this.env.DATABASE_URL ?? "";

    if (!originalUrl) {
      return createDatabaseUrlReport({
        originalUrl: null,
        scheme: null,
        username: null,
        host: null,
        port: null,
        database: null,
        sslmode: null
      });
    }

    const parsed = new URL(originalUrl);

    return createDatabaseUrlReport({
      originalUrl,
      scheme: parsed.protocol.replace(":", ""),
      username: parsed.username || null,
      host: parsed.hostname || null,
      port: parsed.port ? Number(parsed.port) : null,
      database: parsed.pathname.replace(/^\//, "") || null,
      sslmode: parsed.searchParams.get("sslmode")
    });
  }
}

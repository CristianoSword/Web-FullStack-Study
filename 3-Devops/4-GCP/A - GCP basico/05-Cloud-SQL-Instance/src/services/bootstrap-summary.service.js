export class BootstrapSummaryService {
  constructor({ sqlFiles }) {
    this.sqlFiles = sqlFiles;
  }

  buildSummary() {
    return {
      files: this.sqlFiles,
      executionOrder: [
        "sql/001_create_schema.sql",
        "sql/002_seed_accounts.sql"
      ],
      operatorAdvice: [
        "Run schema creation before seed scripts.",
        "Keep seed scripts idempotent for repeated lab setup."
      ]
    };
  }
}

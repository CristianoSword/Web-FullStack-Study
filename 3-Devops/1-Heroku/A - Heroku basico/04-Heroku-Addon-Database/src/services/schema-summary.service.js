export class SchemaSummaryService {
  constructor({ config }) {
    this.config = config;
  }

  buildSummary() {
    return {
      migrationFiles: this.config.migrationFiles,
      verificationCommands: this.config.verificationCommands,
      workflow: [
        "Provision the Heroku Postgres addon",
        "Inspect DATABASE_URL",
        "Run schema migrations through heroku pg:psql",
        "Seed initial data and verify rows"
      ]
    };
  }
}

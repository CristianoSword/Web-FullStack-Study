export class SchemaSummaryService {
  constructor({ networking, parameters }) {
    this.networking = networking;
    this.parameters = parameters;
  }

  buildSummary() {
    return {
      subnetGroup: this.networking.subnetGroup,
      securityGroup: this.networking.securityGroup,
      publiclyAccessible: this.networking.publiclyAccessible,
      retentionDays: this.parameters.backupRetentionPeriodDays,
      storageEncrypted: this.parameters.storageEncrypted,
      migrationFiles: [
        "sql/001_create_accounts.sql",
        "sql/002_seed_accounts.sql"
      ]
    };
  }
}

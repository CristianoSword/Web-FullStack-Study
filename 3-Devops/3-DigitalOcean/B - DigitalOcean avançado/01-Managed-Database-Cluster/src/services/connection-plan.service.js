export class ConnectionPlanService {
  constructor({ settings, trustedSources }) {
    this.settings = settings;
    this.trustedSources = trustedSources;
  }

  buildPlan() {
    const clusterName = this.settings.clusterName;
    const dbName = process.env.DO_DB_NAME ?? "studyapp";
    const dbUser = process.env.DO_DB_USER ?? "studyadmin";

    return {
      connectionLookup: `doctl databases connection ${clusterName}`,
      psqlTemplate: `psql "sslmode=require host=<host> port=25060 dbname=${dbName} user=${dbUser} password=<password>"`,
      firewallRules: this.trustedSources.addresses,
      sslRequirement: "Managed Postgres on DigitalOcean requires SSL-enabled clients."
    };
  }
}

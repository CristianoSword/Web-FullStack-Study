export class AppSpecSummaryService {
  constructor({ envVars }) {
    this.envVars = envVars;
  }

  buildSummary() {
    return {
      totalEnvVars: this.envVars.length,
      runtimeVars: this.envVars.filter((envVar) => envVar.scope === "RUN_TIME").length,
      keys: this.envVars.map((envVar) => envVar.key),
      notes: [
        "App Platform injects PORT automatically.",
        "Health check path must match /health.",
        "deploy_on_push keeps the app synced with GitHub."
      ]
    };
  }
}

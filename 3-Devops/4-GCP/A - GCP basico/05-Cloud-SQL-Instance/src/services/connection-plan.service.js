export class ConnectionPlanService {
  constructor({ instanceSpec, authorizedNetworks }) {
    this.instanceSpec = instanceSpec;
    this.authorizedNetworks = authorizedNetworks;
  }

  buildPlan() {
    return {
      authorizeCommand: `gcloud sql instances patch ${this.instanceSpec.instanceName} --authorized-networks=${this.authorizedNetworks.map((network) => network.value).join(",")}`,
      createDatabaseCommand: `gcloud sql databases create studyapp --instance=${this.instanceSpec.instanceName}`,
      connectCommand: `gcloud sql connect ${this.instanceSpec.instanceName} --user=studyadmin`,
      connectionNotes: [
        "Prefer SSL-enabled clients for direct public IP access.",
        "For workloads, favor Cloud SQL Auth Proxy or private IP networking."
      ]
    };
  }
}

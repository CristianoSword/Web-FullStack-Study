import { SecretContractModel } from "../models/secret-contract.model.js";

export class WorkflowSummaryService {
  constructor({ secrets }) {
    this.secrets = secrets.map((secret) => new SecretContractModel(secret));
  }

  buildSummary() {
    return {
      requiredSecrets: this.secrets,
      artifact: "release.tar.gz",
      deployMechanism: "scp + ssh + remote deploy.sh",
      operatorChecks: [
        "Confirm workflow secrets exist in GitHub repository settings.",
        "Confirm the Droplet host exposes PM2 and Node runtime.",
        "Confirm known_hosts entry matches the deploy target."
      ]
    };
  }
}

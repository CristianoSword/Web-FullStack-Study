import { FailoverStepModel } from "../models/failover-step.model.js";

export class FailoverRunbookService {
  constructor({ clusterSpec }) {
    this.clusterSpec = clusterSpec;
  }

  buildRunbook() {
    return [
      new FailoverStepModel({
        name: "inspect-cluster-health",
        command: `doctl databases get ${this.clusterSpec.name}`,
        purpose: "Confirm primary, standby and maintenance status."
      }),
      new FailoverStepModel({
        name: "freeze-writes",
        command: "Put the application in maintenance mode and drain write traffic.",
        purpose: "Avoid split-brain and write loss during cutover."
      }),
      new FailoverStepModel({
        name: "promote-standby",
        command: `doctl databases replicas list ${this.clusterSpec.name}`,
        purpose: "Identify replica posture before a provider-controlled failover."
      }),
      new FailoverStepModel({
        name: "verify-recovery",
        command: `psql "sslmode=require host=<new-host> port=25060 dbname=studyapp user=studyadmin password=<password>" -c "select now();"`,
        purpose: "Validate the new primary accepts connections and transactions."
      })
    ];
  }
}

import { AuthorizedNetworkModel } from "../models/authorized-network.model.js";
import { SqlInstanceSpecModel } from "../models/sql-instance-spec.model.js";
import { SqlUserModel } from "../models/sql-user.model.js";

export class CloudSqlPlanService {
  constructor({ instanceSpec, users, authorizedNetworks }) {
    this.instanceSpec = new SqlInstanceSpecModel(instanceSpec);
    this.users = users.map((user) => new SqlUserModel(user));
    this.authorizedNetworks = authorizedNetworks.map((network) => new AuthorizedNetworkModel(network));
  }

  buildPlan() {
    return {
      instance: this.instanceSpec,
      users: this.users,
      authorizedNetworks: this.authorizedNetworks,
      createCommand: `gcloud sql instances create ${this.instanceSpec.instanceName} --database-version=${this.instanceSpec.databaseVersion} --tier=${this.instanceSpec.tier} --region=${this.instanceSpec.region} --storage-type=${this.instanceSpec.storageType} --storage-size=${this.instanceSpec.storageGb}`,
      note: "Keep authorized networks narrow and migrate to private IP or Cloud SQL Proxy when possible."
    };
  }
}

import { ClusterSpecModel } from "../models/cluster-spec.model.js";
import { DbUserModel } from "../models/db-user.model.js";

export class ClusterPlanService {
  constructor({ settings, clusterSpec, users, trustedSources }) {
    this.settings = settings;
    this.cluster = new ClusterSpecModel(clusterSpec);
    this.users = users.map((user) => new DbUserModel(user));
    this.trustedSources = trustedSources;
  }

  buildPlan() {
    return {
      cluster: this.cluster,
      users: this.users,
      trustedSources: this.trustedSources,
      createCommand: `doctl databases create ${this.cluster.name} --engine ${this.cluster.engine} --version ${this.cluster.version} --region ${this.cluster.region} --size ${this.cluster.size} --num-nodes ${this.cluster.nodeCount}`,
      postProvisionSteps: [
        "Attach trusted sources",
        "Create database users",
        "Bootstrap schema with SQL files",
        "Store connection string in secret manager"
      ]
    };
  }
}

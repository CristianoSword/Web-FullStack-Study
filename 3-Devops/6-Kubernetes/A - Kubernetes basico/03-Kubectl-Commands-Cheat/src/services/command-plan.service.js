import { ClusterContextModel } from "../models/cluster-context.model.js";
import { CommandGroupModel } from "../models/command-group.model.js";

export class CommandPlanService {
  constructor({ context, groups }) {
    this.context = new ClusterContextModel(context);
    this.groups = groups.map((group) => new CommandGroupModel(group));
  }

  buildPlan() {
    return {
      namespace: this.context.namespace,
      deploymentName: this.context.deploymentName,
      groups: this.groups,
      quickStart: [
        `kubectl get pods -n ${this.context.namespace}`,
        `kubectl describe deployment ${this.context.deploymentName} -n ${this.context.namespace}`,
        `kubectl logs deployment/${this.context.deploymentName} -n ${this.context.namespace}`
      ]
    };
  }
}

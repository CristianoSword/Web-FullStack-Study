import { AppWorkloadModel } from "../models/app-workload.model.js";
import { ClusterNodepoolModel } from "../models/cluster-nodepool.model.js";

export class DoksPlanService {
  constructor({ clusterSpec, appSpec }) {
    this.clusterSpec = clusterSpec;
    this.appSpec = appSpec;
  }

  buildPlan() {
    return {
      cluster: {
        name: this.clusterSpec.name,
        region: this.clusterSpec.region,
        version: this.clusterSpec.version,
        vpcUuid: this.clusterSpec.vpcUuid,
        haControlPlane: this.clusterSpec.haControlPlane
      },
      nodePool: new ClusterNodepoolModel(this.clusterSpec.nodePool),
      workload: new AppWorkloadModel(this.appSpec),
      bootstrapCommands: [
        `doctl kubernetes cluster kubeconfig save ${this.clusterSpec.name}`,
        "kubectl apply -f k8s/namespace.yaml",
        "kubectl apply -f k8s/"
      ]
    };
  }
}

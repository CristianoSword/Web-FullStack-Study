import { AppWorkloadModel } from "../models/app-workload.model.js";
import { ClusterNodePoolModel } from "../models/cluster-nodepool.model.js";

export class GkePlanService {
  constructor({ clusterSpec, appSpec }) {
    this.clusterSpec = {
      ...clusterSpec,
      nodePools: clusterSpec.nodePools.map((pool) => new ClusterNodePoolModel(pool))
    };
    this.appSpec = new AppWorkloadModel(appSpec);
  }

  buildPlan() {
    const { clusterSpec, appSpec } = this;

    return {
      cluster: {
        name: clusterSpec.clusterName,
        projectId: clusterSpec.projectId,
        region: clusterSpec.region,
        releaseChannel: clusterSpec.releaseChannel,
        kubernetesVersion: clusterSpec.kubernetesVersion,
        network: clusterSpec.network,
        subnetwork: clusterSpec.subnetwork,
        privateCluster: clusterSpec.privateCluster,
        workloadIdentityPool: clusterSpec.workloadIdentityPool
      },
      nodePools: clusterSpec.nodePools,
      workload: appSpec,
      commands: {
        createCluster: `gcloud container clusters create ${clusterSpec.clusterName} --project ${clusterSpec.projectId} --region ${clusterSpec.region} --release-channel ${clusterSpec.releaseChannel.toLowerCase()} --cluster-version ${clusterSpec.kubernetesVersion} --network ${clusterSpec.network} --subnetwork ${clusterSpec.subnetwork} --enable-ip-alias --enable-private-nodes --workload-pool ${clusterSpec.workloadIdentityPool}`,
        registerAppsPool: `gcloud container node-pools create apps-pool --cluster ${clusterSpec.clusterName} --region ${clusterSpec.region} --machine-type e2-standard-4 --num-nodes 2 --enable-autoscaling --min-nodes 2 --max-nodes 6`,
        buildImage: `gcloud builds submit --tag ${appSpec.containerImage}`,
        connectCluster: `gcloud container clusters get-credentials ${clusterSpec.clusterName} --region ${clusterSpec.region} --project ${clusterSpec.projectId}`,
        applyManifests: "kubectl apply -f k8s/namespace.yaml -f k8s/configmap.yaml -f k8s/secret.yaml -f k8s/deployment.yaml -f k8s/service.yaml -f k8s/ingress.yaml -f k8s/hpa.yaml"
      }
    };
  }
}

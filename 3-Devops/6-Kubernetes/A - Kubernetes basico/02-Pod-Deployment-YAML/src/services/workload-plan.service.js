import { LabelStrategyModel } from "../models/label-strategy.model.js";
import { WorkloadSpecModel } from "../models/workload-spec.model.js";

export class WorkloadPlanService {
  constructor({ workload, labels }) {
    this.workload = new WorkloadSpecModel(workload);
    this.labels = new LabelStrategyModel(labels);
  }

  buildPlan() {
    return {
      workload: this.workload,
      labels: this.labels,
      commands: {
        apply: "kubectl apply -f k8s/namespace.yaml -f k8s/pod.yaml -f k8s/deployment.yaml -f k8s/service.yaml",
        getPod: `kubectl get pod ${this.workload.appName}-pod -n ${this.workload.namespace}`,
        rollout: `kubectl rollout status deployment/${this.workload.appName}-deployment -n ${this.workload.namespace} --timeout=90s`
      }
    };
  }
}

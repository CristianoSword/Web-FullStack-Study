import { ClusterContextModel } from "../models/cluster-context.model.js";

export class SmokeCheckService {
  constructor({ context }) {
    this.context = new ClusterContextModel(context);
  }

  buildPlan() {
    return [
      {
        name: "get-pods",
        command: `kubectl get pods -n ${this.context.namespace}`,
        purpose: "Listar os pods do namespace do estudo."
      },
      {
        name: "describe-deployment",
        command: `kubectl describe deployment ${this.context.deploymentName} -n ${this.context.namespace}`,
        purpose: "Inspecionar eventos e configuracao do deployment."
      },
      {
        name: "logs",
        command: `kubectl logs deployment/${this.context.deploymentName} -n ${this.context.namespace}`,
        purpose: "Ver os logs recentes da aplicacao."
      },
      {
        name: "rollout-status",
        command: `kubectl rollout status deployment/${this.context.deploymentName} -n ${this.context.namespace}`,
        purpose: "Confirmar o estado do rollout."
      }
    ];
  }
}

import { ServiceSpecModel } from "../models/service-spec.model.js";

export class SmokeCheckService {
  constructor({ serviceSpec }) {
    this.service = new ServiceSpecModel(serviceSpec);
  }

  buildPlan() {
    return [
      {
        name: "rollout",
        command: `kubectl rollout status deployment/${this.service.deploymentName} -n ${this.service.namespace} --timeout=90s`,
        purpose: "Confirmar que o deployment esta pronto."
      },
      {
        name: "describe-service",
        command: `kubectl describe svc ${this.service.serviceName} -n ${this.service.namespace}`,
        purpose: "Inspecionar o mapeamento de portas do NodePort."
      },
      {
        name: "open-nodeport-url",
        command: `minikube service ${this.service.serviceName} -n ${this.service.namespace} --url`,
        purpose: "Descobrir a URL externa exposta pelo Minikube."
      }
    ];
  }
}

import { AccessFlowModel } from "../models/access-flow.model.js";
import { ServiceSpecModel } from "../models/service-spec.model.js";

export class NodeportPlanService {
  constructor({ serviceSpec, accessFlow }) {
    this.service = new ServiceSpecModel(serviceSpec);
    this.access = new AccessFlowModel(accessFlow);
  }

  buildPlan() {
    return {
      service: this.service,
      access: this.access,
      commands: {
        apply: "kubectl apply -f k8s/namespace.yaml -f k8s/deployment.yaml -f k8s/service.yaml",
        describeService: `kubectl describe svc ${this.service.serviceName} -n ${this.service.namespace}`,
        minikubeUrl: `minikube service ${this.service.serviceName} -n ${this.service.namespace} --url`
      }
    };
  }
}

import { AccessFlowModel } from "../models/access-flow.model.js";
import { ServiceSpecModel } from "../models/service-spec.model.js";

export class ServiceSummaryService {
  constructor({ serviceSpec, accessFlow }) {
    this.service = new ServiceSpecModel(serviceSpec);
    this.access = new AccessFlowModel(accessFlow);
  }

  buildSummary() {
    return {
      serviceName: this.service.serviceName,
      namespace: this.service.namespace,
      nodePort: this.service.nodePort,
      targetPort: this.service.containerPort,
      expectedHttpStatus: this.access.expectedHttpStatus
    };
  }
}

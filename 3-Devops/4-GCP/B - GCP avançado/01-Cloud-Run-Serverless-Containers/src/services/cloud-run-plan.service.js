import { CloudRunSpecModel } from "../models/cloud-run-spec.model.js";
import { EnvVarModel } from "../models/env-var.model.js";

export class CloudRunPlanService {
  constructor({ serviceSpec, envVars }) {
    this.serviceSpec = new CloudRunSpecModel(serviceSpec);
    this.envVars = envVars.map((envVar) => new EnvVarModel(envVar));
  }

  buildPlan() {
    return {
      service: this.serviceSpec,
      envVars: this.envVars,
      buildCommand: `gcloud builds submit --tag ${this.serviceSpec.containerImage}`,
      deployCommand: `gcloud run deploy ${this.serviceSpec.serviceName} --image ${this.serviceSpec.containerImage} --region ${this.serviceSpec.region} --concurrency ${this.serviceSpec.concurrency} --memory ${this.serviceSpec.memory} --cpu ${this.serviceSpec.cpu} --max-instances ${this.serviceSpec.maxInstances} --allow-unauthenticated`
    };
  }
}

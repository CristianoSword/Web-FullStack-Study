import { RolloutStepModel } from "../models/rollout-step.model.js";

export class RolloutPlanService {
  constructor({ serviceSpec }) {
    this.serviceSpec = serviceSpec;
  }

  buildPlan() {
    return [
      new RolloutStepModel({
        name: "build-image",
        command: `gcloud builds submit --tag ${this.serviceSpec.containerImage}`,
        purpose: "Build and publish the container artifact."
      }),
      new RolloutStepModel({
        name: "deploy-service",
        command: `gcloud run deploy ${this.serviceSpec.serviceName} --image ${this.serviceSpec.containerImage} --region ${this.serviceSpec.region} --allow-unauthenticated`,
        purpose: "Create or update the Cloud Run service."
      }),
      new RolloutStepModel({
        name: "inspect-service",
        command: `gcloud run services describe ${this.serviceSpec.serviceName} --region ${this.serviceSpec.region}`,
        purpose: "Verify revision, URL and scaling settings."
      }),
      new RolloutStepModel({
        name: "smoke-test",
        command: "curl -I https://<cloud-run-url>/health",
        purpose: "Confirm public health endpoint after rollout."
      })
    ];
  }
}

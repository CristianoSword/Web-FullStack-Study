import { AwsPipelineModel } from "../models/aws-pipeline.model.js";
import { EcsServiceModel } from "../models/ecs-service.model.js";

export class EcsPipelinePlanService {
  constructor({ pipelineSpec, serviceSpec }) {
    this.pipeline = new AwsPipelineModel(pipelineSpec);
    this.service = new EcsServiceModel(serviceSpec);
  }

  buildPlan() {
    return {
      workflowName: this.pipeline.workflowName,
      branch: this.pipeline.defaultBranch,
      imageRepository: `${this.pipeline.accountId}.dkr.ecr.${this.pipeline.awsRegion}.amazonaws.com/${this.pipeline.repositoryName}`,
      cluster: this.service.cluster,
      service: this.service.service,
      steps: [
        "checkout",
        "configure-aws-credentials",
        "login-ecr",
        "build-and-push-image",
        "render-task-definition",
        "deploy-ecs-service"
      ]
    };
  }
}

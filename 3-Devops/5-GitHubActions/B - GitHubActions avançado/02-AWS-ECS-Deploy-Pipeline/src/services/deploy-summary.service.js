import { AwsPipelineModel } from "../models/aws-pipeline.model.js";
import { EcsServiceModel } from "../models/ecs-service.model.js";

export class DeploySummaryService {
  constructor({ pipelineSpec, serviceSpec }) {
    this.pipeline = new AwsPipelineModel(pipelineSpec);
    this.service = new EcsServiceModel(serviceSpec);
  }

  buildSummary() {
    return {
      cluster: this.service.cluster,
      service: this.service.service,
      repository: this.pipeline.repositoryName,
      oidcRoleArn: this.pipeline.oidcRoleArn,
      taskFamily: this.service.taskFamily
    };
  }
}

import { createPipelinePlan } from "../models/pipeline-plan.model.js";

export class PipelinePlanService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildPlan() {
    const pipelineName = this.env.HEROKU_PIPELINE_NAME ?? this.config.pipelineName;
    const stagingApp = this.env.STAGING_APP ?? this.config.stagingApp;
    const productionApp = this.env.PRODUCTION_APP ?? this.config.productionApp;

    return createPipelinePlan({
      pipelineName,
      stagingApp,
      productionApp,
      createPipelineCommand: `heroku pipelines:create ${pipelineName} --stage staging --app ${stagingApp}`,
      addStagingCommand: `heroku pipelines:add ${pipelineName} --stage staging --app ${stagingApp}`,
      addProductionCommand: `heroku pipelines:add ${pipelineName} --stage production --app ${productionApp}`,
      verificationCommands: this.config.verificationCommands
    });
  }
}

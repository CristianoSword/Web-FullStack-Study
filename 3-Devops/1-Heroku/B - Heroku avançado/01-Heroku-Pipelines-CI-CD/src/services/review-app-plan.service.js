import { createReviewAppPlan } from "../models/review-app.model.js";

export class ReviewAppPlanService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildPlan() {
    const pipelineName = this.env.HEROKU_PIPELINE_NAME ?? this.config.pipelineName;

    return createReviewAppPlan({
      pipelineName,
      reviewAppPattern: this.config.reviewAppPattern,
      enableReviewAppsCommand: `heroku reviewapps:enable --pipeline ${pipelineName}`,
      notes: [
        "Connect the Heroku pipeline to the GitHub repository before enabling review apps.",
        "Define postdeploy smoke checks so each PR app validates migrations and seed data."
      ]
    });
  }
}

export class PromotionFlowService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildFlow() {
    const stagingApp = this.env.STAGING_APP ?? this.config.stagingApp;

    return {
      promoteCommand: `heroku pipelines:promote --app ${stagingApp}`,
      releaseChecklist: [
        "Validate the staging release and run smoke checks.",
        "Inspect heroku releases for the staging app.",
        "Promote the slug to production through the pipeline.",
        "Verify production health and rollback plan."
      ]
    };
  }
}

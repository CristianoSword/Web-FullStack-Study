import { createReleaseFlow } from "../models/release-flow.model.js";

export class ContainerDeployPlanService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildPlan() {
    const appName = this.env.HEROKU_APP_NAME ?? this.config.appName;
    const processType = this.config.processType;

    return createReleaseFlow({
      loginCommand: "heroku container:login",
      pushCommand: `heroku container:push ${processType} --app ${appName}`,
      releaseCommand: `heroku container:release ${processType} --app ${appName}`,
      inspectCommand: `docker image inspect registry.heroku.com/${appName}/${processType}`,
      notes: [
        "Build context must match the Dockerfile runtime assets before pushing.",
        "Heroku Container Registry release happens after the push completes successfully.",
        "Use heroku logs --tail after release to validate the dyno boot."
      ]
    });
  }
}

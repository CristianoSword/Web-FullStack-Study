import { createBuildpackPlan } from "../models/buildpack-plan.model.js";

export class BuildpackPlanService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildPlan() {
    const appName = this.env.HEROKU_APP_NAME ?? this.config.appName;
    const buildpackUrl = this.env.BUILDPACK_URL ?? "https://example.invalid/buildpacks/wasmtoy";

    return createBuildpackPlan({
      appName,
      buildpackUrl,
      setBuildpackCommand: `heroku buildpacks:set ${buildpackUrl} --app ${appName}`,
      triggerBuildCommand: `git push heroku main`,
      releaseCommand: `heroku releases --app ${appName}`,
      verificationCommands: this.config.verificationCommands
    });
  }
}

import { createLogPlan } from "../models/log-plan.model.js";

export class LogPlanService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildPlan() {
    const appName = this.env.HEROKU_APP_NAME ?? this.config.appName;
    const source = this.env.LOG_SOURCE ?? "app";

    return createLogPlan({
      appName,
      source,
      tailCommand: `heroku logs --tail --app ${appName}`,
      sourceCommand: `heroku logs --source ${source} --app ${appName}`,
      dynoCommand: `heroku logs --dyno web.1 --app ${appName}`,
      verificationCommands: this.config.verificationCommands
    });
  }
}

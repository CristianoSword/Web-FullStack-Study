import { createAddonPlan } from "../models/addon-plan.model.js";

export class AddonPlanService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildPlan() {
    const appName = this.env.HEROKU_APP_NAME ?? this.config.appName;

    return createAddonPlan({
      appName,
      addonPlan: this.config.addonPlan,
      createCommand: `heroku addons:create ${this.config.addonPlan} --app ${appName}`,
      infoCommand: `heroku pg:info --app ${appName}`,
      psqlCommand: `heroku pg:psql --app ${appName}`,
      migrationFiles: this.config.migrationFiles
    });
  }
}

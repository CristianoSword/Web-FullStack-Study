export class ConfigVarPlanService {
  constructor({ config, stagingVars, productionVars, env = process.env }) {
    this.config = config;
    this.stagingVars = stagingVars;
    this.productionVars = productionVars;
    this.env = env;
  }

  buildPlan() {
    const appName = this.env.HEROKU_APP_NAME ?? this.config.appName;

    return {
      appName,
      stagingSetCommand: this.#buildSetCommand(appName, this.stagingVars),
      productionSetCommand: this.#buildSetCommand(appName, this.productionVars),
      verificationCommands: this.config.verificationCommands,
      managedKeys: this.config.managedKeys
    };
  }

  #buildSetCommand(appName, variables) {
    const entries = Object.entries(variables).map(([key, value]) => `${key}=${value}`);
    return `heroku config:set ${entries.join(" ")} --app ${appName}`;
  }
}

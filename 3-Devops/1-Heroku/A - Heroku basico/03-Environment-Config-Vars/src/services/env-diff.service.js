import { createConfigVarEntry } from "../models/config-var.model.js";
import { createEnvDiffReport } from "../models/env-diff.model.js";

export class EnvDiffService {
  constructor({ config, stagingVars, productionVars, env = process.env }) {
    this.config = config;
    this.stagingVars = stagingVars;
    this.productionVars = productionVars;
    this.env = env;
  }

  buildDiff() {
    const appName = this.env.HEROKU_APP_NAME ?? this.config.appName;
    const entries = this.config.managedKeys.map((key) =>
      createConfigVarEntry(key, this.stagingVars[key] ?? null, this.productionVars[key] ?? null)
    );

    return createEnvDiffReport({
      appName,
      entries,
      verificationCommands: this.config.verificationCommands
    });
  }
}

import { createDomainPlan } from "../models/domain-plan.model.js";

export class DomainPlanService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildPlan() {
    const appName = this.env.HEROKU_APP_NAME ?? this.config.appName;
    const customDomain = this.env.CUSTOM_DOMAIN ?? this.config.customDomain;

    return createDomainPlan({
      appName,
      customDomain,
      dnsTarget: this.config.dnsTarget,
      addDomainCommand: `heroku domains:add ${customDomain} --app ${appName}`,
      showDomainsCommand: `heroku domains --app ${appName}`,
      verificationCommands: this.config.verificationCommands
    });
  }
}

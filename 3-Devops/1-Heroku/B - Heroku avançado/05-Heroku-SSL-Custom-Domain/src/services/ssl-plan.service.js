import { createSslPlan } from "../models/ssl-plan.model.js";

export class SslPlanService {
  constructor({ config, checklist, env = process.env }) {
    this.config = config;
    this.checklist = checklist;
    this.env = env;
  }

  buildPlan() {
    const appName = this.env.HEROKU_APP_NAME ?? this.config.appName;

    return createSslPlan({
      appName,
      enableAcmCommand: `heroku certs:auto:enable --app ${appName}`,
      inspectCertificateCommand: `heroku certs:auto --app ${appName}`,
      checklist: this.checklist.steps
    });
  }
}

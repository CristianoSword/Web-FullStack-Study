import { AppComponentModel } from "../models/app-component.model.js";
import { AppDomainModel } from "../models/app-domain.model.js";

export class AppPlatformPlanService {
  constructor({ settings, domains }) {
    this.settings = settings;
    this.domains = domains.map((domain) => new AppDomainModel(domain));
  }

  buildPlan() {
    return {
      appName: this.settings.appName,
      region: this.settings.region,
      repo: this.settings.githubRepo,
      branch: this.settings.branch,
      component: new AppComponentModel({
        name: "web",
        sourceDir: "app",
        instanceSize: "basic-xxs",
        instanceCount: 1,
        httpPort: 8080
      }),
      domains: this.domains,
      createCommand: "doctl apps create --spec app-spec.yaml"
    };
  }
}

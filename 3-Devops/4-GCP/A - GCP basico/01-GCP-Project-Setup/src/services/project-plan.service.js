import { ProjectSpecModel } from "../models/project-spec.model.js";

export class ProjectPlanService {
  constructor({ settings, projectSpec }) {
    this.settings = settings;
    this.projectSpec = new ProjectSpecModel(projectSpec);
  }

  buildPlan() {
    return {
      project: this.projectSpec,
      createCommand: `gcloud projects create ${this.projectSpec.projectId} --name="${this.projectSpec.projectName}"`,
      billingCommand: `gcloud beta billing projects link ${this.projectSpec.projectId} --billing-account=${this.settings.billingAccount}`,
      defaults: {
        region: this.projectSpec.defaultRegion,
        zone: this.projectSpec.defaultZone
      }
    };
  }
}

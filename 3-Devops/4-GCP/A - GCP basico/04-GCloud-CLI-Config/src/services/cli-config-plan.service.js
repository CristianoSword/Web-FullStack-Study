import { CliProfileModel } from "../models/cli-profile.model.js";

export class CliConfigPlanService {
  constructor({ cliProfile }) {
    this.cliProfile = new CliProfileModel(cliProfile);
  }

  buildPlan() {
    return {
      profile: this.cliProfile,
      commands: [
        `gcloud config configurations create ${this.cliProfile.name}`,
        `gcloud config configurations activate ${this.cliProfile.name}`,
        `gcloud config set project ${this.cliProfile.projectId}`,
        `gcloud config set compute/region ${this.cliProfile.region}`,
        `gcloud config set compute/zone ${this.cliProfile.zone}`
      ]
    };
  }
}

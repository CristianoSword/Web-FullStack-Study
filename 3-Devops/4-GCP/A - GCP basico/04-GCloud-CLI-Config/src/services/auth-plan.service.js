import { AdcProfileModel } from "../models/adc-profile.model.js";

export class AuthPlanService {
  constructor({ cliProfile, adcProfile }) {
    this.cliProfile = cliProfile;
    this.adcProfile = new AdcProfileModel(adcProfile);
  }

  buildPlan() {
    return {
      userAuth: [
        "gcloud auth login",
        "gcloud auth list"
      ],
      applicationDefaultCredentials: [
        `gcloud auth application-default login --project=${this.adcProfile.quotaProject}`,
        `gcloud auth application-default set-quota-project ${this.adcProfile.quotaProject}`
      ],
      note: `Service account expected for automation: ${this.adcProfile.serviceAccount}`
    };
  }
}

import { ApiEnablementModel } from "../models/api-enablement.model.js";

export class ApiPlanService {
  constructor({ settings, enabledApis }) {
    this.settings = settings;
    this.enabledApis = enabledApis.map((api) => new ApiEnablementModel(api));
  }

  buildPlan() {
    return {
      projectId: this.settings.projectId,
      apis: this.enabledApis,
      enableCommand: `gcloud services enable ${this.enabledApis.map((api) => api.name).join(" ")} --project ${this.settings.projectId}`,
      note: "Enable only the APIs required by the first workloads to limit unnecessary surface area."
    };
  }
}

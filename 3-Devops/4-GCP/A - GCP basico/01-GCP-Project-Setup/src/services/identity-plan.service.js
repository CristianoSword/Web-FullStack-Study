import { ServiceAccountModel } from "../models/service-account.model.js";

export class IdentityPlanService {
  constructor({ settings, serviceAccount }) {
    this.settings = settings;
    this.serviceAccount = new ServiceAccountModel(serviceAccount);
  }

  buildPlan() {
    const email = `${this.serviceAccount.accountId}@${this.settings.projectId}.iam.gserviceaccount.com`;

    return {
      serviceAccount: this.serviceAccount,
      email,
      createCommand: `gcloud iam service-accounts create ${this.serviceAccount.accountId} --display-name="${this.serviceAccount.displayName}" --project ${this.settings.projectId}`,
      roleBindings: this.serviceAccount.roles.map(
        (role) =>
          `gcloud projects add-iam-policy-binding ${this.settings.projectId} --member=serviceAccount:${email} --role=${role}`
      )
    };
  }
}

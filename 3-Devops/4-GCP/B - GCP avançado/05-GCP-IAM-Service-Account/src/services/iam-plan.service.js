import { IamBindingModel } from "../models/iam-binding.model.js";
import { ServiceAccountSpecModel } from "../models/service-account-spec.model.js";
import { WorkloadIdentityBindingModel } from "../models/workload-identity-binding.model.js";

export class IamPlanService {
  constructor({ serviceAccountSpec, iamBindings, workloadIdentityBinding }) {
    this.serviceAccount = new ServiceAccountSpecModel(serviceAccountSpec);
    this.bindings = iamBindings.map((binding) => new IamBindingModel(binding));
    this.workloadIdentityBinding = new WorkloadIdentityBindingModel(workloadIdentityBinding);
  }

  buildPlan() {
    return {
      serviceAccount: this.serviceAccount,
      bindings: this.bindings,
      workloadIdentity: this.workloadIdentityBinding,
      commands: {
        createServiceAccount: `gcloud iam service-accounts create ${this.serviceAccount.accountId} --display-name "${this.serviceAccount.displayName}" --project ${this.serviceAccount.projectId}`,
        bindProjectRole: `gcloud projects add-iam-policy-binding ${this.serviceAccount.projectId} --member="serviceAccount:${this.serviceAccount.email}" --role="roles/logging.logWriter"`,
        bindBucketRole: `gcloud storage buckets add-iam-policy-binding gs://${this.serviceAccount.targetBucket} --member="serviceAccount:${this.serviceAccount.email}" --role="roles/storage.objectViewer"`,
        bindWorkloadIdentity: `gcloud iam service-accounts add-iam-policy-binding ${this.serviceAccount.email} --role="${this.workloadIdentityBinding.role}" --member="${this.workloadIdentityBinding.member}"`,
        verifyAuth: "node client/access-bucket.js"
      }
    };
  }
}

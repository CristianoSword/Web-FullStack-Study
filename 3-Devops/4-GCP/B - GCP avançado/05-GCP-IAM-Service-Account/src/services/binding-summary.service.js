import { IamBindingModel } from "../models/iam-binding.model.js";
import { WorkloadIdentityBindingModel } from "../models/workload-identity-binding.model.js";

export class BindingSummaryService {
  constructor({ iamBindings, workloadIdentityBinding }) {
    this.bindings = iamBindings.map((binding) => new IamBindingModel(binding));
    this.workloadIdentityBinding = new WorkloadIdentityBindingModel(workloadIdentityBinding);
  }

  buildSummary() {
    return {
      projectRoles: this.bindings.filter((binding) => binding.resource === "project").map((binding) => binding.role),
      bucketRoles: this.bindings.filter((binding) => binding.resource === "bucket").map((binding) => binding.role),
      workloadIdentityMember: this.workloadIdentityBinding.member,
      workloadIdentityRole: this.workloadIdentityBinding.role
    };
  }
}

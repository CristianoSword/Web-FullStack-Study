import { ScalingPolicyModel } from "../models/scaling-policy.model.js";

export class ScalingPolicyService {
  constructor({ policies }) {
    this.policies = policies;
  }

  buildPlan() {
    const normalizedPolicies = this.policies.map((policy) => new ScalingPolicyModel(policy));
    const scaleOutPolicies = normalizedPolicies.filter((policy) =>
      ["ASGAverageCPUUtilization", "ALBRequestCountPerTarget"].includes(policy.metric)
    );

    return {
      policies: normalizedPolicies,
      scaleOutPolicies,
      validationNotes: [
        "CPU target tracking should add instances before saturation.",
        "ALB request-per-target guards against uneven traffic spikes.",
        "Cooldowns avoid thrashing during burst traffic."
      ]
    };
  }
}

import { EnvironmentVariableModel } from "../models/environment-variable.model.js";

export class EnvironmentPlanService {
  constructor({ spec }) {
    this.spec = spec;
    this.variables = spec.variables.map((variable) => new EnvironmentVariableModel(variable));
  }

  buildPlan() {
    return {
      workflowName: this.spec.workflowName,
      jobEnvironment: this.spec.jobEnvironment,
      variables: this.variables,
      steps: ["checkout", "setup-node", "print-environment-snapshot", "publish-environment-summary"]
    };
  }
}

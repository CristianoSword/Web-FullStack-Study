import { ActionContractModel } from "../models/action-contract.model.js";
import { ActionUsageModel } from "../models/action-usage.model.js";

export class CustomActionPlanService {
  constructor({ spec, sampleInputs }) {
    this.contract = new ActionContractModel(spec);
    this.usage = new ActionUsageModel(sampleInputs);
  }

  buildPlan() {
    return {
      actionName: this.contract.name,
      runtime: "node20",
      main: this.contract.main,
      requiredInputs: this.contract.inputs.filter((input) => input.required).map((input) => input.name),
      outputs: this.contract.outputs,
      sampleUsage: this.usage
    };
  }
}

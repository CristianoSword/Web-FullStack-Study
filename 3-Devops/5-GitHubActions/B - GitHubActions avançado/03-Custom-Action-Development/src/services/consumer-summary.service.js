import { ActionContractModel } from "../models/action-contract.model.js";
import { ActionUsageModel } from "../models/action-usage.model.js";

export class ConsumerSummaryService {
  constructor({ spec, sampleInputs }) {
    this.contract = new ActionContractModel(spec);
    this.usage = new ActionUsageModel(sampleInputs);
  }

  buildSummary() {
    return {
      workflowStepId: "release_note",
      actionPath: "./action",
      inputs: this.usage,
      expectedOutputs: this.contract.outputs
    };
  }
}

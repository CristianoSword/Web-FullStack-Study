import { StepResultModel } from "../models/step-result.model.js";

export class ConditionalSummaryService {
  constructor({ spec }) {
    this.spec = spec;
  }

  buildSummary() {
    return {
      inputs: this.spec.inputs,
      validationOutput: new StepResultModel({
        stepName: "validation",
        outputKey: this.spec.validationOutput
      }).outputKey
    };
  }
}

import { WorkflowOutputModel } from "../models/workflow-output.model.js";

export class SummaryOutputService {
  constructor({ spec }) {
    this.spec = spec;
  }

  buildSummary() {
    return {
      secretName: this.spec.secretName,
      outputKeys: [
        new WorkflowOutputModel({
          key: "api_url",
          producerStep: "env_snapshot",
          purpose: "Levar a URL final para o resumo do workflow."
        }).key
      ]
    };
  }
}

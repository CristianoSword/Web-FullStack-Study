import { PipelineStageModel } from "../models/pipeline-stage.model.js";

export class ActionsPlanService {
  constructor({ stages }) {
    this.stages = stages.map((stage) => new PipelineStageModel(stage));
  }

  buildPlan() {
    return {
      trigger: "push to main or workflow_dispatch",
      stages: this.stages,
      designNotes: [
        "Tests gate the deploy job.",
        "Artifacts decouple build from remote deployment.",
        "SSH deploy keeps the droplet workflow explicit and reviewable."
      ]
    };
  }
}

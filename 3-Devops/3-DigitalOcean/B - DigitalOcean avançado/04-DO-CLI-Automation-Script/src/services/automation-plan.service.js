import { AutomationStepModel } from "../models/automation-step.model.js";
import { ResourceGroupModel } from "../models/resource-group.model.js";

export class AutomationPlanService {
  constructor({ resourcePlan, scriptSequence }) {
    this.resourcePlan = new ResourceGroupModel(resourcePlan);
    this.scriptSequence = scriptSequence.map((step) => new AutomationStepModel(step));
  }

  buildPlan() {
    return {
      resources: this.resourcePlan,
      sequence: this.scriptSequence,
      idempotencyNotes: [
        "Inspect current state before create operations.",
        "Group resources under one project/tag for easy lookup.",
        "Rollback order must reverse dependencies."
      ]
    };
  }
}

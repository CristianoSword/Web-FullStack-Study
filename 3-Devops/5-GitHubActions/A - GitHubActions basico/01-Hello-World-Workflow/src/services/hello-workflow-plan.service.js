import { WorkflowTriggerModel } from "../models/workflow-trigger.model.js";

export class HelloWorkflowPlanService {
  constructor({ spec, context }) {
    this.spec = spec;
    this.context = context;
  }

  buildPlan() {
    return {
      workflowName: this.spec.workflowName,
      displayName: this.spec.displayName,
      triggers: new WorkflowTriggerModel({
        pushesTo: this.spec.defaultBranches,
        pullRequestsTo: ["main"],
        manualDispatch: true
      }),
      nodeVersion: this.spec.nodeVersion,
      sampleGreeting: this.spec.messageTemplate
        .replace("{actor}", this.context.actor)
        .replace("{eventName}", this.context.eventName)
        .replace("{refName}", this.context.refName),
      steps: ["checkout", "setup-node", "prepare-context", "render-greeting", "publish-summary"]
    };
  }
}

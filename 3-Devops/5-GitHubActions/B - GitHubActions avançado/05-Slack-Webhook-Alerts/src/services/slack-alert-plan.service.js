import { FailureEventModel } from "../models/failure-event.model.js";
import { SlackAlertModel } from "../models/slack-alert.model.js";

export class SlackAlertPlanService {
  constructor({ spec, failureEvent }) {
    this.spec = new SlackAlertModel(spec);
    this.failureEvent = new FailureEventModel(failureEvent);
  }

  buildPlan() {
    return {
      workflowName: this.spec.workflowName,
      severity: this.spec.severity,
      channelLabel: this.spec.channelLabel,
      incidentWorkflow: this.failureEvent.workflow,
      steps: [
        "simulate-failure",
        "render-slack-payload",
        "send-slack-webhook",
        "publish-alert-summary"
      ]
    };
  }
}

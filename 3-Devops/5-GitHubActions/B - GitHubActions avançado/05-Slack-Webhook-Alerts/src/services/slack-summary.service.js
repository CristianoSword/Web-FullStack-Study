import { FailureEventModel } from "../models/failure-event.model.js";
import { SlackAlertModel } from "../models/slack-alert.model.js";

export class SlackSummaryService {
  constructor({ spec, failureEvent }) {
    this.spec = new SlackAlertModel(spec);
    this.failureEvent = new FailureEventModel(failureEvent);
  }

  buildSummary() {
    return {
      title: this.spec.title,
      webhookSecret: this.spec.webhookSecret,
      runUrl: this.failureEvent.runUrl,
      repository: this.failureEvent.repository,
      payloadFile: "payloads/slack-alert.json"
    };
  }
}

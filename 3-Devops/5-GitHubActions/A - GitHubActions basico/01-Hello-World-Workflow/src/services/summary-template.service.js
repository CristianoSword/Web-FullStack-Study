import { GreetingContextModel } from "../models/greeting-context.model.js";

export class SummaryTemplateService {
  constructor({ context }) {
    this.context = new GreetingContextModel(context);
  }

  buildSummary() {
    return {
      actor: this.context.actor,
      eventName: this.context.eventName,
      refName: this.context.refName,
      note: this.context.note
    };
  }
}

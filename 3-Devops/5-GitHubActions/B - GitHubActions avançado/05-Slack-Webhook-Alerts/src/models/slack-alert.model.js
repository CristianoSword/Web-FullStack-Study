export class SlackAlertModel {
  constructor({ workflowName, severity, channelLabel, webhookSecret, title, environment }) {
    this.workflowName = workflowName;
    this.severity = severity;
    this.channelLabel = channelLabel;
    this.webhookSecret = webhookSecret;
    this.title = title;
    this.environment = environment;
  }
}

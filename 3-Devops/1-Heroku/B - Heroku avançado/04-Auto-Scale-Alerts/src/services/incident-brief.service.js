export class IncidentBriefService {
  constructor({ config, metrics, channels, alertRules }) {
    this.config = config;
    this.metrics = metrics;
    this.channels = channels;
    this.alertRules = alertRules;
  }

  buildBrief() {
    const triggeredRules = this.alertRules.filter((rule) => rule.triggered).map((rule) => rule.name);

    return {
      appName: this.config.appName,
      severity: triggeredRules.length >= 2 ? "high" : "medium",
      triggeredRules,
      channels: this.channels.channels,
      metrics: this.metrics,
      summary:
        "This sample incident simulates elevated CPU, latency and memory pressure requiring autoscale review."
    };
  }
}

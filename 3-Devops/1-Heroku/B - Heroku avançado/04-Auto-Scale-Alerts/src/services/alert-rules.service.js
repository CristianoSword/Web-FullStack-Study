import { createAlertRule } from "../models/alert-rule.model.js";

export class AlertRulesService {
  constructor({ config, metrics }) {
    this.config = config;
    this.metrics = metrics;
  }

  buildRules() {
    return [
      createAlertRule({
        name: "cpu-scale-out",
        threshold: this.config.cpuScaleOutThreshold,
        currentValue: this.metrics.cpuLoadAverage,
        triggered: this.metrics.cpuLoadAverage >= this.config.cpuScaleOutThreshold,
        recommendation: "Scale out web dynos when sustained CPU remains above threshold."
      }),
      createAlertRule({
        name: "latency-scale-out",
        threshold: this.config.latencyScaleOutThresholdMs,
        currentValue: this.metrics.p95LatencyMs,
        triggered: this.metrics.p95LatencyMs >= this.config.latencyScaleOutThresholdMs,
        recommendation: "Increase web concurrency or dyno count when p95 latency is too high."
      }),
      createAlertRule({
        name: "memory-alert",
        threshold: this.config.memoryAlertThresholdPercent,
        currentValue: this.metrics.memoryUsagePercent,
        triggered: this.metrics.memoryUsagePercent >= this.config.memoryAlertThresholdPercent,
        recommendation: "Inspect memory growth and consider a larger dyno class or leak analysis."
      })
    ];
  }
}

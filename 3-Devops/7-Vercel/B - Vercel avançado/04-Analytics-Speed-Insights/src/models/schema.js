/**
 * Schema and Type definitions for 04-Analytics-Speed-Insights
 */
export const AppConfigSchema = {
  service: "04-Analytics-Speed-Insights",
  version: "1.0.0",
  allowedModes: ["development", "staging", "production"],
  requiredEnv: ["PORT", "ENV_MODE", "SERVICE_NAME"]
};

export class MetricModel {
  constructor(name, value, unit = "ms") {
    this.name = name;
    this.value = value;
    this.unit = unit;
    this.timestamp = new Date().toISOString();
  }
}

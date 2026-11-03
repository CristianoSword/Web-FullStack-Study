/**
 * Schema and Type definitions for 03-Spaces-Object-Storage
 */
export const AppConfigSchema = {
  service: "03-Spaces-Object-Storage",
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

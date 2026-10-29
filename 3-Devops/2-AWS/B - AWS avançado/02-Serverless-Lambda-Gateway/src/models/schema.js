/**
 * Schema and Type definitions for 02-Serverless-Lambda-Gateway
 */
export const AppConfigSchema = {
  service: "02-Serverless-Lambda-Gateway",
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

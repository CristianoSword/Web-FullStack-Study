import { runtimeConfig } from "../lib/runtime-config.mjs";

export const buildEnvironmentSummary = () => ({
  service: runtimeConfig.serviceName,
  runtime: runtimeConfig.runtime,
  host: runtimeConfig.host,
  port: runtimeConfig.port,
  appMode: runtimeConfig.appMode,
  message: runtimeConfig.message,
  featureFlag: runtimeConfig.featureFlag
});

import { createAutoscalePlan } from "../models/autoscale-plan.model.js";

export class AutoscalePlanService {
  constructor({ config, metrics, env = process.env }) {
    this.config = config;
    this.metrics = metrics;
    this.env = env;
  }

  buildPlan() {
    const appName = this.env.HEROKU_APP_NAME ?? this.config.appName;
    const processType = this.config.processType;
    const currentDynos = Number.parseInt(
      this.env.CURRENT_DYNO_COUNT ?? String(this.metrics.currentDynos),
      10
    );

    const wantsScaleOut =
      this.metrics.cpuLoadAverage >= this.config.cpuScaleOutThreshold ||
      this.metrics.p95LatencyMs >= this.config.latencyScaleOutThresholdMs;

    const recommendedDynos = wantsScaleOut
      ? Math.min(currentDynos + 1, this.config.maxDynos)
      : Math.max(currentDynos, this.config.minDynos);

    return createAutoscalePlan({
      appName,
      processType,
      currentDynos,
      recommendedDynos,
      scaleCommand: `heroku ps:scale ${processType}=${recommendedDynos} --app ${appName}`,
      verificationCommands: this.config.verificationCommands
    });
  }
}

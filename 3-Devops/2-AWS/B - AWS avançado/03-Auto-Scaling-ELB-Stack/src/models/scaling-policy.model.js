export class ScalingPolicyModel {
  constructor({ name, metric, targetValue, cooldownSeconds }) {
    this.name = name;
    this.metric = metric;
    this.targetValue = targetValue;
    this.cooldownSeconds = cooldownSeconds;
  }
}

export class FirewallRuleModel {
  constructor({ name, network, direction, priority, targetTags, allowed, sourceRanges }) {
    this.name = name;
    this.network = network;
    this.direction = direction;
    this.priority = priority;
    this.targetTags = targetTags ?? [];
    this.allowed = allowed ?? [];
    this.sourceRanges = sourceRanges ?? [];
  }
}

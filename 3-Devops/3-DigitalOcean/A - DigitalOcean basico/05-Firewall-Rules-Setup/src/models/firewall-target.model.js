export class FirewallTargetModel {
  constructor({ tagNames, dropletNames, environment }) {
    this.tagNames = tagNames ?? [];
    this.dropletNames = dropletNames ?? [];
    this.environment = environment;
  }
}

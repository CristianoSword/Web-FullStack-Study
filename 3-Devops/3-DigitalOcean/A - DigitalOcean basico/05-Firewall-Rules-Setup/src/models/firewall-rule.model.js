export class FirewallRuleModel {
  constructor({ protocol, ports, description }) {
    this.protocol = protocol;
    this.ports = ports;
    this.description = description;
  }
}

import { FirewallRuleModel } from "../models/firewall-rule.model.js";

export class FirewallRulesService {
  constructor({ inboundRules, outboundRules }) {
    this.inboundRules = inboundRules.map((rule) => new FirewallRuleModel(rule));
    this.outboundRules = outboundRules.map((rule) => new FirewallRuleModel(rule));
  }

  buildSummary() {
    return {
      inbound: this.inboundRules,
      outbound: this.outboundRules,
      notes: [
        "SSH is scoped to a single admin CIDR.",
        "HTTP/HTTPS stay open to the public Internet.",
        "Egress is limited to DNS and package-friendly web traffic."
      ]
    };
  }
}

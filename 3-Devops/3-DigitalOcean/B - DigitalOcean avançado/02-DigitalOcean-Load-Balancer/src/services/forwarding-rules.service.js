import { ForwardingRuleModel } from "../models/forwarding-rule.model.js";

export class ForwardingRulesService {
  constructor({ rules }) {
    this.rules = rules.map((rule) => new ForwardingRuleModel(rule));
  }

  buildSummary() {
    return {
      rules: this.rules,
      notes: [
        "HTTP can stay enabled for redirect flow or internal testing.",
        "HTTPS terminates at the load balancer with a managed certificate.",
        "Target application receives HTTP on port 8080."
      ]
    };
  }
}

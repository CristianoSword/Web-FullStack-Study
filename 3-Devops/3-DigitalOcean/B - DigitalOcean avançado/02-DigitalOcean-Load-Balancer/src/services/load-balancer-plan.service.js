import { HealthCheckModel } from "../models/health-check.model.js";
import { LoadBalancerSpecModel } from "../models/load-balancer-spec.model.js";

export class LoadBalancerPlanService {
  constructor({ settings, spec, healthCheck }) {
    this.settings = settings;
    this.spec = new LoadBalancerSpecModel(spec);
    this.healthCheck = new HealthCheckModel(healthCheck);
  }

  buildPlan() {
    return {
      spec: this.spec,
      healthCheck: this.healthCheck,
      createCommand: `doctl compute load-balancer create --name ${this.spec.name} --region ${this.spec.region} --tag-name ${this.spec.dropletTag}`,
      availabilityGoal: "Distribute traffic across Droplets tagged study-web with HTTPS at the edge."
    };
  }
}

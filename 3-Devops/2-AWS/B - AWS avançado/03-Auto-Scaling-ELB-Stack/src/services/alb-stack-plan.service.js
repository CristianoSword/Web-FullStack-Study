import { AutoScalingGroupModel } from "../models/auto-scaling-group.model.js";
import { LoadBalancerModel } from "../models/load-balancer.model.js";

export class AlbStackPlanService {
  constructor({ settings, instances }) {
    this.settings = settings;
    this.instances = instances;
  }

  buildPlan() {
    const loadBalancer = new LoadBalancerModel({
      albName: this.settings.albName,
      targetGroupName: this.settings.targetGroupName,
      healthCheckPath: this.instances.healthCheckPath
    });

    const autoScalingGroup = new AutoScalingGroupModel({
      autoScalingGroupName: this.settings.autoScalingGroupName,
      launchTemplateName: this.settings.launchTemplateName,
      desiredCapacity: this.instances.desiredCapacity,
      minSize: this.instances.minSize,
      maxSize: this.instances.maxSize,
      privateSubnets: this.instances.privateSubnets
    });

    return {
      region: this.settings.region,
      vpcId: this.settings.vpcId,
      loadBalancer,
      autoScalingGroup,
      deployCommand: `aws cloudformation deploy --template-file cloudformation/stack.yaml --stack-name ${this.settings.stackName} --capabilities CAPABILITY_IAM`,
      rolloutChecks: [
        "Listener 443 forwarding to target group",
        "Target group health checks returning 200",
        "ASG capacity spread across two private subnets"
      ]
    };
  }
}

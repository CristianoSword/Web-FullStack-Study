import { createEc2LaunchPlan } from "../models/ec2-launch-plan.model.js";

export class Ec2LaunchPlanService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildPlan() {
    const keyPair = this.env.AWS_KEY_PAIR ?? "study-ec2-key";
    const securityGroup = this.env.AWS_SECURITY_GROUP ?? "study-ec2-sg";

    return createEc2LaunchPlan({
      amiId: this.config.amiId,
      instanceType: this.config.instanceType,
      region: this.config.defaultRegion,
      keyPair,
      securityGroup,
      runCommand:
        `aws ec2 run-instances --image-id ${this.config.amiId} --instance-type ${this.config.instanceType} ` +
        `--key-name ${keyPair} --security-groups ${securityGroup} --user-data file://cloud-init/user-data.sh --region ${this.config.defaultRegion}`,
      verificationCommands: this.config.verificationCommands
    });
  }
}

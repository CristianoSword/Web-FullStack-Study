import { createAwsCliPlan } from "../models/aws-cli-plan.model.js";

export class AwsCliPlanService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildPlan() {
    const profileName = this.env.AWS_PROFILE ?? this.config.profileName;
    const region = this.env.AWS_DEFAULT_REGION ?? this.config.defaultRegion;

    return createAwsCliPlan({
      profileName,
      region,
      configureCommands: [
        `aws configure set region ${region} --profile ${profileName}`,
        `aws configure set output ${this.config.outputFormat} --profile ${profileName}`,
        `aws configure set aws_access_key_id <access-key-id> --profile ${profileName}`,
        `aws configure set aws_secret_access_key <secret-access-key> --profile ${profileName}`
      ],
      verificationCommands: this.config.verificationCommands
    });
  }
}

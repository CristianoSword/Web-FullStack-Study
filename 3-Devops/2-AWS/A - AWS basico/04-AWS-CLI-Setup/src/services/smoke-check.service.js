export class SmokeCheckService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildChecks() {
    const profileName = this.env.AWS_PROFILE ?? this.config.profileName;
    const region = this.env.AWS_DEFAULT_REGION ?? this.config.defaultRegion;

    return {
      checks: [
        `aws configure list --profile ${profileName}`,
        `aws sts get-caller-identity --profile ${profileName}`,
        `aws ec2 describe-availability-zones --region ${region} --profile ${profileName}`
      ],
      purpose: "Confirm credentials, identity and default region wiring for the AWS CLI profile."
    };
  }
}

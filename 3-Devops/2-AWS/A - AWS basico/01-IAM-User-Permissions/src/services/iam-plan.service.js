import { createIamPlan } from "../models/iam-plan.model.js";

export class IamPlanService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildPlan() {
    const userName = this.env.AWS_IAM_USER ?? this.config.userName;
    const groupName = this.env.AWS_IAM_GROUP ?? this.config.groupName;

    return createIamPlan({
      userName,
      groupName,
      managedPolicyArn: this.config.managedPolicyArn,
      commands: [
        `aws iam create-user --user-name ${userName}`,
        `aws iam create-group --group-name ${groupName}`,
        `aws iam attach-group-policy --group-name ${groupName} --policy-arn ${this.config.managedPolicyArn}`,
        `aws iam add-user-to-group --user-name ${userName} --group-name ${groupName}`
      ],
      verificationCommands: this.config.verificationCommands
    });
  }
}

import { createVpcPlan } from "../models/vpc-plan.model.js";

export class VpcPlanService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildPlan() {
    const vpcName = this.env.AWS_VPC_NAME ?? this.config.vpcName;

    return createVpcPlan({
      vpcName,
      cidrBlock: this.config.cidrBlock,
      createVpcCommand: `aws ec2 create-vpc --cidr-block ${this.config.cidrBlock} --tag-specifications "ResourceType=vpc,Tags=[{Key=Name,Value=${vpcName}}]"`,
      attachInternetGatewayCommand: "aws ec2 attach-internet-gateway --internet-gateway-id <igw-id> --vpc-id <vpc-id>",
      verificationCommands: this.config.verificationCommands
    });
  }
}

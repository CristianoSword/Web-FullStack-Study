$ErrorActionPreference = "Stop"

[pscustomobject]@{
  CreateVpc = "aws ec2 create-vpc --cidr-block 10.0.0.0/16"
  CreatePublicSubnet = "aws ec2 create-subnet --vpc-id <vpc-id> --cidr-block 10.0.1.0/24 --availability-zone us-east-1a"
  CreatePrivateSubnet = "aws ec2 create-subnet --vpc-id <vpc-id> --cidr-block 10.0.11.0/24 --availability-zone us-east-1a"
  AttachIgw = "aws ec2 attach-internet-gateway --internet-gateway-id <igw-id> --vpc-id <vpc-id>"
  DescribeRoutes = "aws ec2 describe-route-tables --filters Name=vpc-id,Values=<vpc-id>"
}

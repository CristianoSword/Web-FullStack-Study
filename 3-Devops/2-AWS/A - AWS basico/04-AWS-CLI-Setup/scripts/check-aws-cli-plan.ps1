$ErrorActionPreference = "Stop"

[pscustomobject]@{
  SetRegion = "aws configure set region us-east-1 --profile study"
  SetOutput = "aws configure set output json --profile study"
  ShowConfig = "aws configure list --profile study"
  CallerIdentity = "aws sts get-caller-identity --profile study"
  DescribeAz = "aws ec2 describe-availability-zones --region us-east-1 --profile study"
}

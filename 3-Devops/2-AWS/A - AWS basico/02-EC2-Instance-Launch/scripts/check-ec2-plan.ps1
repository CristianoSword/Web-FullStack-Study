$ErrorActionPreference = "Stop"

[pscustomobject]@{
  RunInstance = "aws ec2 run-instances --image-id ami-0c02fb55956c7d316 --instance-type t3.micro --key-name study-ec2-key --security-groups study-ec2-sg --user-data file://cloud-init/user-data.sh --region us-east-1"
  DescribeInstances = "aws ec2 describe-instances"
  WaitStatus = "aws ec2 wait instance-status-ok --instance-ids <instance-id>"
  Ssh = "ssh -i study-ec2-key.pem ec2-user@<public-ip>"
  CurlHttp = "curl http://<public-ip>"
}

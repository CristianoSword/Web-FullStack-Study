$ErrorActionPreference = "Stop"

[pscustomobject]@{
  CreateUser = "aws iam create-user --user-name study-deployer"
  CreateGroup = "aws iam create-group --group-name study-deployers"
  AttachPolicy = "aws iam attach-group-policy --group-name study-deployers --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess"
  AddUserToGroup = "aws iam add-user-to-group --user-name study-deployer --group-name study-deployers"
  CreateAccessKey = "aws iam create-access-key --user-name study-deployer"
}

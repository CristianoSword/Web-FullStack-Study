$root = Split-Path -Parent $PSScriptRoot

[pscustomobject]@{
  Init    = 'terraform init'
  Fmt     = 'terraform fmt -check'
  Plan    = 'terraform plan -var-file=environments/staging.tfvars'
  Apply   = 'terraform apply -var-file=environments/staging.tfvars'
  Inspect = 'terraform output'
} | Format-List

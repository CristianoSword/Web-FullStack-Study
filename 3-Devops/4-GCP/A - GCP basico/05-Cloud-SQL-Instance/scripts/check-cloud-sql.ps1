$root = Split-Path -Parent $PSScriptRoot
$spec = Get-Content (Join-Path $root 'config/instance-spec.json') | ConvertFrom-Json
$networks = Get-Content (Join-Path $root 'config/authorized-networks.json') | ConvertFrom-Json

[pscustomobject]@{
  CreateInstance = "gcloud sql instances create $($spec.instanceName) --database-version=$($spec.databaseVersion) --tier=$($spec.tier) --region=$($spec.region) --storage-type=$($spec.storageType) --storage-size=$($spec.storageGb)"
  AuthorizeIp    = "gcloud sql instances patch $($spec.instanceName) --authorized-networks=$($networks[0].value)"
  CreateDatabase = "gcloud sql databases create studyapp --instance=$($spec.instanceName)"
  Connect        = "gcloud sql connect $($spec.instanceName) --user=studyadmin"
  Bootstrap      = 'mysql < sql/001_create_schema.sql'
} | Format-List

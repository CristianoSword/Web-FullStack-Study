$root = Split-Path -Parent $PSScriptRoot
$profile = Get-Content (Join-Path $root 'config/cli-profile.json') | ConvertFrom-Json
$adc = Get-Content (Join-Path $root 'config/adc-profile.json') | ConvertFrom-Json

[pscustomobject]@{
  CreateConfig = "gcloud config configurations create $($profile.name)"
  Activate     = "gcloud config configurations activate $($profile.name)"
  SetProject   = "gcloud config set project $($profile.projectId)"
  SetRegion    = "gcloud config set compute/region $($profile.region)"
  SetZone      = "gcloud config set compute/zone $($profile.zone)"
  AdcLogin     = "gcloud auth application-default login --project=$($adc.quotaProject)"
} | Format-List

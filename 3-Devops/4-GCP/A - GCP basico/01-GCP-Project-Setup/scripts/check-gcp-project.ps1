$root = Split-Path -Parent $PSScriptRoot
$settings = Get-Content (Join-Path $root 'config/settings.json') | ConvertFrom-Json
$apis = Get-Content (Join-Path $root 'config/enabled-apis.json') | ConvertFrom-Json
$serviceAccount = Get-Content (Join-Path $root 'config/service-account.json') | ConvertFrom-Json

[pscustomobject]@{
  CreateProject = "gcloud projects create $($settings.projectId) --name=""$($settings.projectName)"""
  LinkBilling   = "gcloud beta billing projects link $($settings.projectId) --billing-account=$($settings.billingAccount)"
  EnableApis    = "gcloud services enable $($apis -join ' ') --project $($settings.projectId)"
  CreateSa      = "gcloud iam service-accounts create $($serviceAccount.accountId) --display-name=""$($serviceAccount.displayName)"" --project $($settings.projectId)"
  Region        = $settings.region
} | Format-List

$root = Split-Path -Parent $PSScriptRoot
$serviceAccount = Get-Content (Join-Path $root 'config/service-account-spec.json') | ConvertFrom-Json
$workload = Get-Content (Join-Path $root 'config/workload-identity-binding.json') | ConvertFrom-Json

[pscustomobject]@{
  CreateServiceAccount = "gcloud iam service-accounts create $($serviceAccount.accountId) --display-name `"$($serviceAccount.displayName)`" --project $($serviceAccount.projectId)"
  GrantProjectRole     = "gcloud projects add-iam-policy-binding $($serviceAccount.projectId) --member=`"serviceAccount:$($serviceAccount.email)`" --role=`"roles/logging.logWriter`""
  GrantBucketRole      = "gcloud storage buckets add-iam-policy-binding gs://$($serviceAccount.targetBucket) --member=`"serviceAccount:$($serviceAccount.email)`" --role=`"roles/storage.objectViewer`""
  BindWorkloadIdentity = "gcloud iam service-accounts add-iam-policy-binding $($serviceAccount.email) --role=`"$($workload.role)`" --member=`"$($workload.member)`""
  VerifyAccess         = 'node client/access-bucket.js'
} | Format-List

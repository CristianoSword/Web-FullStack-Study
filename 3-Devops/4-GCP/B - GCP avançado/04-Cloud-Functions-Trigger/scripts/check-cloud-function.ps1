$root = Split-Path -Parent $PSScriptRoot
$function = Get-Content (Join-Path $root 'config/function-spec.json') | ConvertFrom-Json
$trigger = Get-Content (Join-Path $root 'config/storage-trigger.json') | ConvertFrom-Json

[pscustomobject]@{
  PrepareBucket  = "gcloud storage buckets create gs://$($trigger.bucket) --location=$($function.region)"
  DeployFunction = "gcloud functions deploy $($function.functionName) --gen2 --runtime $($function.runtime) --region $($function.region) --source function --entry-point $($function.entryPoint)"
  EventFilters   = "--trigger-event-filters=type=$($trigger.eventType) --trigger-event-filters=bucket=$($trigger.bucket)"
  Describe       = "gcloud functions describe $($function.functionName) --gen2 --region $($function.region)"
  ReadLogs       = "gcloud functions logs read $($function.functionName) --gen2 --region $($function.region) --limit 20"
} | Format-List

$root = Split-Path -Parent $PSScriptRoot
$settings = Get-Content (Join-Path $root 'config/settings.json') | ConvertFrom-Json
$manifest = Get-Content (Join-Path $root 'config/object-manifest.json') | ConvertFrom-Json

[pscustomobject]@{
  CreateBucket = "gcloud storage buckets create gs://$($settings.bucketName) --location=$($settings.location) --default-storage-class=$($settings.storageClass) --project=$($settings.projectId)"
  UploadAsset  = "gcloud storage cp samples/banner.svg gs://$($settings.bucketName)/public/banner.svg"
  Describe     = "gcloud storage buckets describe gs://$($settings.bucketName)"
  PublicUrl    = "https://storage.googleapis.com/$($settings.bucketName)/public/banner.svg"
  Objects      = ($manifest | ForEach-Object { $_.path }) -join ', '
} | Format-List

$root = Split-Path -Parent $PSScriptRoot
$settings = Get-Content (Join-Path $root 'config/settings.json') | ConvertFrom-Json
$objects = Get-Content (Join-Path $root 'config/object-manifest.json') | ConvertFrom-Json

[pscustomobject]@{
  ListBuckets  = "aws --endpoint-url $($settings.endpoint) s3 ls"
  UploadPublic = "aws --endpoint-url $($settings.endpoint) s3 cp samples/banner.svg s3://$($settings.bucketName)/public/banner.svg --content-type image/svg+xml --cache-control 'public, max-age=86400'"
  ApplyCors    = "aws --endpoint-url $($settings.endpoint) s3api put-bucket-cors --bucket $($settings.bucketName) --cors-configuration file://config/cors.json"
  ApplyPolicy  = "aws --endpoint-url $($settings.endpoint) s3api put-bucket-policy --bucket $($settings.bucketName) --policy file://config/bucket-policy.json"
  ManifestKeys = ($objects | ForEach-Object { $_.key }) -join ', '
} | Format-List

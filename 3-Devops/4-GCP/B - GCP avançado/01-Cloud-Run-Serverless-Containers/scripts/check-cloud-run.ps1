$root = Split-Path -Parent $PSScriptRoot
$spec = Get-Content (Join-Path $root 'config/service-spec.json') | ConvertFrom-Json

[pscustomobject]@{
  BuildImage   = "gcloud builds submit --tag $($spec.containerImage)"
  Deploy       = "gcloud run deploy $($spec.serviceName) --image $($spec.containerImage) --region $($spec.region) --concurrency $($spec.concurrency) --memory $($spec.memory) --cpu $($spec.cpu) --max-instances $($spec.maxInstances) --allow-unauthenticated"
  ReplaceYaml  = "gcloud run services replace cloudrun/service.yaml --region $($spec.region)"
  Describe     = "gcloud run services describe $($spec.serviceName) --region $($spec.region)"
  PublicHealth = 'curl -I https://<cloud-run-url>/health'
} | Format-List

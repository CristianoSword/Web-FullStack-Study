$root = Split-Path -Parent $PSScriptRoot
$settings = Get-Content (Join-Path $root 'config/settings.json') | ConvertFrom-Json
$domains = Get-Content (Join-Path $root 'config/domains.json') | ConvertFrom-Json

[pscustomobject]@{
  ValidateSpec = 'doctl apps spec validate app-spec.yaml'
  CreateApp    = 'doctl apps create --spec app-spec.yaml'
  ListApps     = 'doctl apps list'
  TailDeploy   = 'doctl apps list-deployments <app-id>'
  Domains      = ($domains | ForEach-Object { "$($_.hostname) [$($_.type)]" }) -join ', '
  PublicHealth = "curl -I https://$($settings.domain)/health"
} | Format-List

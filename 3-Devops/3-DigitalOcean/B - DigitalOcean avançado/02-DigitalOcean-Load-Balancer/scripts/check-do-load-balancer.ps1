$root = Split-Path -Parent $PSScriptRoot
$spec = Get-Content (Join-Path $root 'config/load-balancer-spec.json') | ConvertFrom-Json
$rules = Get-Content (Join-Path $root 'config/forwarding-rules.json') | ConvertFrom-Json
$health = Get-Content (Join-Path $root 'config/health-check.json') | ConvertFrom-Json

[pscustomobject]@{
  CreateLb       = "doctl compute load-balancer create --name $($spec.name) --region $($spec.region) --tag-name $($spec.dropletTag)"
  Forwarding     = ($rules | ForEach-Object { "$($_.entryProtocol):$($_.entryPort)->$($_.targetProtocol):$($_.targetPort)" }) -join '; '
  HealthCheck    = "$($health.protocol) $($health.path) every $($health.checkIntervalSeconds)s"
  InspectTargets = 'doctl compute load-balancer get <lb-id>'
  PublicCheck    = 'curl -I https://<lb-ip>/health'
} | Format-List

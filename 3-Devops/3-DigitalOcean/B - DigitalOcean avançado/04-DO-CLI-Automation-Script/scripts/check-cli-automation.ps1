$root = Split-Path -Parent $PSScriptRoot
$plan = Get-Content (Join-Path $root 'config/resource-plan.json') | ConvertFrom-Json
$sequence = Get-Content (Join-Path $root 'config/script-sequence.json') | ConvertFrom-Json

[pscustomobject]@{
  Project    = $plan.projectName
  Region     = $plan.region
  Droplets   = ($plan.droplets | ForEach-Object { $_.name }) -join ', '
  Sequence   = ($sequence | ForEach-Object { $_.name }) -join ' -> '
  Provision  = 'bash scripts/provision.sh'
  Inspect    = 'bash scripts/inspect.sh'
  Rollback   = 'bash scripts/rollback.sh'
} | Format-List

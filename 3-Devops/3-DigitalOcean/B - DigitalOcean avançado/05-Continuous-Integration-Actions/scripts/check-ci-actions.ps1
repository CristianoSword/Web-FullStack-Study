$root = Split-Path -Parent $PSScriptRoot
$stages = Get-Content (Join-Path $root 'config/pipeline-stages.json') | ConvertFrom-Json
$secrets = Get-Content (Join-Path $root 'config/github-secrets.json') | ConvertFrom-Json

[pscustomobject]@{
  Workflow = '.github/workflows/digitalocean-deploy.yml'
  Stages   = ($stages | ForEach-Object { $_.name }) -join ' -> '
  Secrets  = ($secrets -join ', ')
  DryRun   = 'act push -W .github/workflows/digitalocean-deploy.yml'
  Health   = 'curl -I https://study.example.com/health'
} | Format-List

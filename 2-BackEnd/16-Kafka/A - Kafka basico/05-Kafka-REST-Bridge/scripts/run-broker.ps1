$ErrorActionPreference = "Stop"

function Assert-LastExitCode {
  param(
    [string]$Operation
  )

  if ($LASTEXITCODE -ne 0) {
    throw "$Operation failed with exit code $LASTEXITCODE."
  }
}

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

docker compose up -d
Assert-LastExitCode "docker compose up"

Write-Host "Kafka REST bridge broker disponivel em localhost:53092"
Write-Host "Proximo passo: iniciar a API e bootstrap do topico"

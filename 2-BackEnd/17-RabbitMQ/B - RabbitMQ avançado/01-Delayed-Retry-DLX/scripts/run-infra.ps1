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

Write-Host "RabbitMQ Delayed Retry AMQP disponivel em localhost:5677"
Write-Host "RabbitMQ Management UI disponivel em http://localhost:15677"

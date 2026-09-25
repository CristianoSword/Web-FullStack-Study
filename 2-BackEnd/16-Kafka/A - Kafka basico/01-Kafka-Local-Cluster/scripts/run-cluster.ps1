$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

docker compose up -d

Write-Host "Kafka cluster iniciado."
Write-Host " - Broker 1: localhost:19092"
Write-Host " - Broker 2: localhost:29092"
Write-Host "Proximo passo: scripts/bootstrap-topics.ps1"

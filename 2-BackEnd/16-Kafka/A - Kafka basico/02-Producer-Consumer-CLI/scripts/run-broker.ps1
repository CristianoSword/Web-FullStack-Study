$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

docker compose up -d

Write-Host "Kafka broker disponivel em localhost:39092"
Write-Host "Proximo passo: scripts/bootstrap-topic.ps1"

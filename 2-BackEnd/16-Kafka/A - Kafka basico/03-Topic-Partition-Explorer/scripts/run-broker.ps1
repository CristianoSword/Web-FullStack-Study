$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

docker compose up -d

Write-Host "Kafka explorer broker disponivel em localhost:49092"
Write-Host "Proximo passo: scripts/bootstrap-lab.ps1"

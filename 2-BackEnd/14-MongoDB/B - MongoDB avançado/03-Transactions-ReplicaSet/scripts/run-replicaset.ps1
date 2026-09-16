$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

docker compose up -d

Write-Host "Replica set containers iniciados:"
Write-Host " - localhost:27024"
Write-Host " - localhost:27025"
Write-Host " - localhost:27026"
Write-Host "Proximo passo: scripts/init-replica.ps1"

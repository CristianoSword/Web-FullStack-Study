$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host "Replica set endpoints:"
Write-Host " - mongodb://localhost:27024"
Write-Host " - mongodb://localhost:27025"
Write-Host " - mongodb://localhost:27026"
Write-Host "Scripts de execucao:"
Write-Host " - scripts/init-replica.ps1"
Write-Host " - scripts/seed-lab.ps1"
Write-Host " - scripts/run-transaction.ps1 -Mode commit"
Write-Host " - scripts/run-transaction.ps1 -Mode rollback"
Write-Host " - queries/verification.mongodb.js"

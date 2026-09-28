$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host "Cluster Kafka KRaft local"
Write-Host " - Broker 1: localhost:19092"
Write-Host " - Broker 2: localhost:29092"
Write-Host "Scripts principais:"
Write-Host " - scripts/run-cluster.ps1"
Write-Host " - scripts/bootstrap-topics.ps1"
Write-Host " - scripts/describe-topics.ps1"
Write-Host " - scripts/check-metadata.ps1"

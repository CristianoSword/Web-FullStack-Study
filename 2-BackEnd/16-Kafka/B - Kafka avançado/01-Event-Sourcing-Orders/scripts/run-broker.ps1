$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

docker compose up -d

Write-Host "Kafka event sourcing broker disponivel em localhost:54092"
Write-Host "Proximo passo: iniciar a API de pedidos"

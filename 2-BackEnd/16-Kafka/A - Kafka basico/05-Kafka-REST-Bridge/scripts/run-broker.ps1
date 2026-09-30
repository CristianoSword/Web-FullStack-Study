$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

docker compose up -d

Write-Host "Kafka REST bridge broker disponivel em localhost:53092"
Write-Host "Proximo passo: iniciar a API e bootstrap do topico"

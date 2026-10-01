$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

docker compose up -d

Write-Host "Kafka streams aggregator broker disponivel em localhost:55092"
Write-Host "Proximo passo: iniciar o agregador de janelas"

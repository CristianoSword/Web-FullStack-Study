$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

docker compose up -d

Write-Host "Kafka broker disponivel em localhost:56092"
Write-Host "Schema Registry disponivel em http://localhost:58081"
Write-Host "Proximo passo: iniciar a API de contratos Avro"

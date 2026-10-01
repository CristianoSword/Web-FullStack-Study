$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

docker compose up -d

Write-Host "Kafka exactly-once broker disponivel em localhost:57092"
Write-Host "Proximo passo: iniciar a API do pipeline transacional"

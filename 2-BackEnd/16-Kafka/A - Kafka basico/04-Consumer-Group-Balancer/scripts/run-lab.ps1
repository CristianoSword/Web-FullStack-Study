$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

docker compose up -d

Write-Host "Kafka balancer lab disponivel em localhost:51092 e localhost:52092"
Write-Host "Proximo passo: bootstrap de topico, produtores e consumers"

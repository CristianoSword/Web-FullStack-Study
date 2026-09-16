$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

docker compose up -d

Write-Host "MongoDB pronto em mongodb://localhost:27027/commerce_graph"
Write-Host "Rode os scripts de lookup no Compass para inspecionar customers, products e orders."

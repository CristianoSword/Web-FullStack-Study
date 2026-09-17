$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

docker compose up -d

Write-Host "MongoDB pronto em mongodb://localhost:27028/perf_lab"
Write-Host "Use os scripts de explain para comparar planos com e sem indice."

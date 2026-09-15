$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot
docker compose up -d

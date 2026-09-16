$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

docker compose up -d

Write-Host "MongoDB pronto em mongodb://localhost:27023/places_directory"
Write-Host "Abra o Compass e rode os scripts:"
Write-Host " - queries/text-search.mongodb.js"
Write-Host " - queries/geolocation.mongodb.js"
Write-Host " - queries/verification.mongodb.js"

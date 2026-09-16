$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host "Compass connection: mongodb://localhost:27023/places_directory"
Write-Host "Collection: venues"
Write-Host "Consultas disponiveis:"
Write-Host " - queries/text-search.mongodb.js"
Write-Host " - queries/geolocation.mongodb.js"
Write-Host " - queries/verification.mongodb.js"
Write-Host "Indices esperados:"
Write-Host " - venue_text_search"
Write-Host " - venue_location_2dsphere"

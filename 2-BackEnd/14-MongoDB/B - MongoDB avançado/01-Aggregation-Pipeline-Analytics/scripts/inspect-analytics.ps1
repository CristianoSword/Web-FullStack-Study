$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host "Compass connection: mongodb://localhost:27022/analytics_lab"
Write-Host "Pipelines:"
Write-Host " - queries/revenue-by-region.mongodb.js"
Write-Host " - queries/channel-category-breakdown.mongodb.js"
Write-Host " - queries/seller-scoreboard.mongodb.js"

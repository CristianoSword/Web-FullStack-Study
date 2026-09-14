$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host "Compass connection: mongodb://localhost:27019/sales_analytics"
Write-Host "Comparison queries: queries/comparison.mongodb.js"
Write-Host "Verification queries: queries/verification.mongodb.js"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host "Compass connection: mongodb://localhost:27028/perf_lab"
Write-Host "Sequencia sugerida:"
Write-Host " - queries/explain-without-index.mongodb.js"
Write-Host " - queries/explain-with-index.mongodb.js"
Write-Host " - queries/explain-sorted-range.mongodb.js"
Write-Host " - queries/verification.mongodb.js"

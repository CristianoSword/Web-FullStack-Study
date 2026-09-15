$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host "Compass connection: mongodb://localhost:27021/inventory_catalog"
Write-Host "Index review script: queries/indexes.mongodb.js"
Write-Host "Duplicate check script: queries/duplicate-check.mongodb.js"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host "Compass connection: mongodb://localhost:27020/project_tracker"
Write-Host "Update script: queries/update-operators.mongodb.js"
Write-Host "Verification script: queries/verification.mongodb.js"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host "Compass connection: mongodb://localhost:27018/customer_crm"
Write-Host "CRUD script: queries/crud.mongodb.js"
Write-Host "Verification script: queries/verification.mongodb.js"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host "Compass connection: mongodb://localhost:27027/commerce_graph"
Write-Host "Pipelines disponiveis:"
Write-Host " - queries/orders-with-customer.mongodb.js"
Write-Host " - queries/orders-with-products.mongodb.js"
Write-Host " - queries/customer-order-summary.mongodb.js"
Write-Host " - queries/verification.mongodb.js"

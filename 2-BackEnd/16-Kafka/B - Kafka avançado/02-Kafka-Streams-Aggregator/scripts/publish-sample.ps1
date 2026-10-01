$ErrorActionPreference = "Stop"

$body = @{
  storeId = "STORE-001"
  amount = 199.9
  occurredAt = (Get-Date).ToUniversalTime().ToString("o")
} | ConvertTo-Json

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:4510/sales-events" `
  -ContentType "application/json" `
  -Body $body

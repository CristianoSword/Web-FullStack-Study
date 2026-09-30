$ErrorActionPreference = "Stop"

$body = @{
  reason = "customer-request"
} | ConvertTo-Json

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:4410/orders/ORDER-2001/cancel" `
  -ContentType "application/json" `
  -Body $body

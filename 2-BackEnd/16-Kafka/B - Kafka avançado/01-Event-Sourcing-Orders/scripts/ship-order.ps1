$ErrorActionPreference = "Stop"

$body = @{
  trackingCode = "TRACK-ABC-999"
} | ConvertTo-Json

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:4410/orders/ORDER-2001/ship" `
  -ContentType "application/json" `
  -Body $body

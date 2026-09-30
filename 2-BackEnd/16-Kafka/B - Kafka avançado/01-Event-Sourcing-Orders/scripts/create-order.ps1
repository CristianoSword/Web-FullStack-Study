$ErrorActionPreference = "Stop"

$body = @{
  orderId = "ORDER-2001"
  customerId = "CUSTOMER-88"
  totalAmount = 249.9
} | ConvertTo-Json

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:4410/orders" `
  -ContentType "application/json" `
  -Body $body

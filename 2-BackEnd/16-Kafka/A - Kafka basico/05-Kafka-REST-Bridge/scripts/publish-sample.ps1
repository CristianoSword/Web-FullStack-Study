$ErrorActionPreference = "Stop"

$body = @{
  eventType = "order.created"
  source = "rest-bridge-playbook"
  partition = 1
  payload = @{
    orderId = "ORDER-1001"
    total = 149.90
    currency = "BRL"
  }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:4310/events" `
  -ContentType "application/json" `
  -Body $body

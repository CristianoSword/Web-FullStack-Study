$ErrorActionPreference = "Stop"

$body = @{
  eventId = "evt-1001"
  eventType = "customer.created"
  customerId = "cust-900"
  email = "customer@example.com"
  occurredAt = (Get-Date).ToUniversalTime().ToString("o")
  segment = "gold"
} | ConvertTo-Json

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:4610/events/avro" `
  -ContentType "application/json" `
  -Body $body

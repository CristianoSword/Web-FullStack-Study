$ErrorActionPreference = "Stop"

$payload = @{
  messageId = "msg-1001"
  idempotencyKey = "idem-1001"
  paymentId = "pay-1001"
  amount = 149.90
  currency = "BRL"
  occurredAt = "2026-06-29T15:00:00.000Z"
  metadata = @{
    source = "checkout-api"
    attempt = 1
  }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Method Post -Uri "http://localhost:4710/payments/process" -ContentType "application/json" -Body $payload

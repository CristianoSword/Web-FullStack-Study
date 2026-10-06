$ErrorActionPreference = "Stop"

$payload = @{
  severity = "error"
  message = "Payment provider timeout"
  payload = @{
    service = "billing"
    code = "PAYMENT_TIMEOUT"
  }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Method Post -Uri "http://localhost:4940/logs/publish" -ContentType "application/json" -Body $payload

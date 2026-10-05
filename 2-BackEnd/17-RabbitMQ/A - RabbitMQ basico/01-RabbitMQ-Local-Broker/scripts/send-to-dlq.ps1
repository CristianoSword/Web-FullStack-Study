$ErrorActionPreference = "Stop"

$payload = @{
  type = "DeadLetterEvent"
  payload = @{
    reason = "manual-test"
    detail = "forcing dlq sample"
  }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Method Post -Uri "http://localhost:4910/messages/dead-letter" -ContentType "application/json" -Body $payload

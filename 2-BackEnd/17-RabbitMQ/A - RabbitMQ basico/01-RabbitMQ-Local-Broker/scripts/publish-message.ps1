$ErrorActionPreference = "Stop"

$payload = @{
  type = "InfoEvent"
  payload = @{
    origin = "local-script"
    detail = "hello from rabbitmq"
  }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Method Post -Uri "http://localhost:4910/messages/publish" -ContentType "application/json" -Body $payload

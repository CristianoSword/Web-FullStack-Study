$ErrorActionPreference = "Stop"

$payload = @{
  severity = "warning"
  message = "Inventory nearing threshold"
  payload = @{
    service = "inventory"
    remaining = 3
  }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Method Post -Uri "http://localhost:4940/logs/publish" -ContentType "application/json" -Body $payload

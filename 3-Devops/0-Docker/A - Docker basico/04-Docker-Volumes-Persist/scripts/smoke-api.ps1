$ErrorActionPreference = "Stop"

$payload = @{
  sku = "CAB-001"
  name = "USB-C Cable"
  quantity = 20
  location = "rack-a1"
} | ConvertTo-Json

Invoke-RestMethod -Method Get -Uri "http://127.0.0.1:3020/health"
Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:3020/items" -ContentType "application/json" -Body $payload
Invoke-RestMethod -Method Get -Uri "http://127.0.0.1:3020/items"

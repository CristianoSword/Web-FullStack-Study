$ErrorActionPreference = "Stop"

$payload = @{
  operation = "sum"
  operands = @(4, 7, 9)
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Method Post -Uri "http://localhost:4950/rpc/call" -ContentType "application/json" -Body $payload

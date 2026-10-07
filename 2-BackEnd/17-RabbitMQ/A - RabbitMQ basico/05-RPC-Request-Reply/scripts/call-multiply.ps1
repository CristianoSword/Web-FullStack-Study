$ErrorActionPreference = "Stop"

$payload = @{
  operation = "multiply"
  operands = @(3, 5, 2)
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Method Post -Uri "http://localhost:4950/rpc/call" -ContentType "application/json" -Body $payload

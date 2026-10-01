$ErrorActionPreference = "Stop"

$body = @{
  schemaPath = "schemas/customer-event-v2.avsc"
  compatibility = "BACKWARD"
} | ConvertTo-Json

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:4610/schemas/register" `
  -ContentType "application/json" `
  -Body $body

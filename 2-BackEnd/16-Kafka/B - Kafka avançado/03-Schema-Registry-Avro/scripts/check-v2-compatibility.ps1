$body = @{
  schemaPath = "schemas/customer-event-v2.avsc"
} | ConvertTo-Json

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:4610/schemas/compatibility" `
  -ContentType "application/json" `
  -Body $body

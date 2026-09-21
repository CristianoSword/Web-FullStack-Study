$body = @{
  query = "query ServicesQuery { services { id name owner status uptimePercent } }"
} | ConvertTo-Json -Compress

Invoke-RestMethod `
  -Uri "http://localhost:4104/graphql" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body

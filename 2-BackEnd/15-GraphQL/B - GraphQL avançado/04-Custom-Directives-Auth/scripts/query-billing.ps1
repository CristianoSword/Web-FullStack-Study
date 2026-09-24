$body = @{
  query = "query BillingSummary { billingSummary { accountId month totalRevenue } }"
} | ConvertTo-Json -Compress

Invoke-RestMethod `
  -Uri "http://localhost:4204/graphql" `
  -Method Post `
  -ContentType "application/json" `
  -Headers @{ Authorization = "Bearer token-billing-ops" } `
  -Body $body

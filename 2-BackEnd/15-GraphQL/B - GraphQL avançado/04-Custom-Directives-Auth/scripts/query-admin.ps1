$body = @{
  query = "query AdminReports { adminReports { id title severity } }"
} | ConvertTo-Json -Compress

Invoke-RestMethod `
  -Uri "http://localhost:4204/graphql" `
  -Method Post `
  -ContentType "application/json" `
  -Headers @{ Authorization = "Bearer token-admin-root" } `
  -Body $body

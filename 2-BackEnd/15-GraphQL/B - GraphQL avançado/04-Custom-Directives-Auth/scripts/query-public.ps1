$body = @{
  query = "query PublicFeed { publicFeed }"
} | ConvertTo-Json -Compress

Invoke-RestMethod `
  -Uri "http://localhost:4204/graphql" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body

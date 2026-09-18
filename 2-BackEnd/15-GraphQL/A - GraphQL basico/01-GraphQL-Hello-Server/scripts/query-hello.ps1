$body = @{
  query = "query HelloQuery { hello(name: ""Cristiano"") { message timestamp source } }"
} | ConvertTo-Json -Compress

Invoke-RestMethod `
  -Uri "http://localhost:4100/graphql" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body

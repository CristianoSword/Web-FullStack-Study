$body = @{
  query = "mutation CreateTask { createTask(input: { title: ""Publish GraphQL CRUD lab"", description: ""Finalize documentation and validation."" }) { id title description status } }"
} | ConvertTo-Json -Compress

Invoke-RestMethod `
  -Uri "http://localhost:4103/graphql" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body

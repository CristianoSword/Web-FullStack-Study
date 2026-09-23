$body = @{
  query = "query PostsWithStats { posts(limit: 4) { id title author { id name team } metric { postId views likes } } sqlStats { executedQueries recentStatements } }"
} | ConvertTo-Json -Compress

Invoke-RestMethod `
  -Uri "http://localhost:4202/graphql" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body

$body = @{
  query = "query FilteredPosts { posts(authorId: ""USR-102"", published: true) { id title published author { id name } } }"
} | ConvertTo-Json -Compress

Invoke-RestMethod `
  -Uri "http://localhost:4102/graphql" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body

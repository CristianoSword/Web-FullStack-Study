$body = @{
  query = "query UsersAndPosts { users { id name role posts { id title } } }"
} | ConvertTo-Json -Compress

Invoke-RestMethod `
  -Uri "http://localhost:4101/graphql" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body

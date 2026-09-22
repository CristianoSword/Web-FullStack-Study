$body = @{
  query = "query PostsByTeam { postsByTeam(team: ""platform"") { id title author { id name } comments { id authorName } } }"
} | ConvertTo-Json -Compress

Invoke-RestMethod `
  -Uri "http://localhost:4201/graphql" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body

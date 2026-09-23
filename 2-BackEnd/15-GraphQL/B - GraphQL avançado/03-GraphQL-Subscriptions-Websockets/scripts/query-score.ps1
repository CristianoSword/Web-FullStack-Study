$body = @{
  query = "query LatestScore { latestScore { matchId homeTeam awayTeam homeScore awayScore minute } }"
} | ConvertTo-Json -Compress

Invoke-RestMethod `
  -Uri "http://localhost:4203/graphql" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body

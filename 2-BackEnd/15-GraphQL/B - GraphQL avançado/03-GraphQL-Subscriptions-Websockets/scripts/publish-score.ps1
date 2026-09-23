$body = @{
  query = "mutation PublishScore { publishScore(input: { matchId: ""MTC-1001"", homeTeam: ""OpenAI FC"", awayTeam: ""Codex United"", homeScore: 2, awayScore: 1, minute: 78 }) { matchId homeScore awayScore minute } }"
} | ConvertTo-Json -Compress

Invoke-RestMethod `
  -Uri "http://localhost:4203/graphql" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body

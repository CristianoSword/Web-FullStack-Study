$body = @{
  name = "nightly-report"
  handler = "reports.generate"
  priority = 8
  concurrencyWeight = 2
  tenant = "ops"
  scheduledFor = (Get-Date).ToString("o")
  payload = @{
    report = "queue-pressure"
  }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:3072/scheduler/jobs" `
  -ContentType "application/json" `
  -Body $body

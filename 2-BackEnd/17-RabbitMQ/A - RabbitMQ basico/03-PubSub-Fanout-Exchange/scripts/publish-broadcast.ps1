$ErrorActionPreference = "Stop"

$payload = @{
  eventType = "NewsletterPublished"
  payload = @{
    newsletterId = "newsletter-2026-06"
    channel = "global"
  }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Method Post -Uri "http://localhost:4930/events/publish" -ContentType "application/json" -Body $payload

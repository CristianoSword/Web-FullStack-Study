$ErrorActionPreference = "Stop"

$payload = @{
  jobType = "email-campaign"
  payload = @{
    campaignId = "cmp-9001"
    forceFail = $true
  }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Method Post -Uri "http://localhost:4920/tasks/dispatch" -ContentType "application/json" -Body $payload

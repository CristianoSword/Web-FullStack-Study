$ErrorActionPreference = "Stop"

$payload = @{
  jobType = "invoice-sync"
  payload = @{
    customerId = "customer-2002"
    forceFail = $true
  }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Method Post -Uri "http://localhost:4960/jobs/publish" -ContentType "application/json" -Body $payload

$ErrorActionPreference = "Stop"

$payload = @{
  jobType = "invoice-sync"
  payload = @{
    customerId = "customer-1001"
    forceFail = $false
  }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Method Post -Uri "http://localhost:4960/jobs/publish" -ContentType "application/json" -Body $payload

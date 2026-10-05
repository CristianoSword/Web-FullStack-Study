$ErrorActionPreference = "Stop"

$payload = @{
  jobType = "thumbnail-generation"
  payload = @{
    assetId = "asset-1001"
    size = "large"
  }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Method Post -Uri "http://localhost:4920/tasks/dispatch" -ContentType "application/json" -Body $payload

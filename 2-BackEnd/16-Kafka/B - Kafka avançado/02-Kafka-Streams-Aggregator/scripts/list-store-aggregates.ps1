$ErrorActionPreference = "Stop"

param(
  [Parameter(Mandatory = $true)]
  [string]$StoreId
)

Invoke-RestMethod -Method Get -Uri "http://localhost:4510/aggregates/$StoreId"

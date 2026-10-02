$ErrorActionPreference = "Stop"

Invoke-RestMethod -Method Get -Uri "http://localhost:4810/orders"

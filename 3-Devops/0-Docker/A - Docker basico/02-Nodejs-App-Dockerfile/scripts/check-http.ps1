$ErrorActionPreference = "Stop"
Invoke-RestMethod -Method Get -Uri "http://localhost:3005/health"

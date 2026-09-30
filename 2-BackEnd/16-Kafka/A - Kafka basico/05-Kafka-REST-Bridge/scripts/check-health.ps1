$ErrorActionPreference = "Stop"

Invoke-RestMethod -Method Get -Uri "http://localhost:4310/health"

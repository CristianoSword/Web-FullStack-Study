$ErrorActionPreference = "Stop"
Invoke-RestMethod -Method Get -Uri "http://localhost:3010/environment"

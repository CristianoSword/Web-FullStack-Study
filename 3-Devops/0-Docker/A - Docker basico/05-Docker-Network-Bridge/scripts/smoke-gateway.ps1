$ErrorActionPreference = "Stop"

Invoke-RestMethod -Method Get -Uri "http://127.0.0.1:3030/health"
Invoke-RestMethod -Method Get -Uri "http://127.0.0.1:3030/catalog"
Invoke-RestMethod -Method Get -Uri "http://127.0.0.1:3030/network"

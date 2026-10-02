$ErrorActionPreference = "Stop"

Invoke-RestMethod -Method Post -Uri "http://localhost:4810/outbox/publish"

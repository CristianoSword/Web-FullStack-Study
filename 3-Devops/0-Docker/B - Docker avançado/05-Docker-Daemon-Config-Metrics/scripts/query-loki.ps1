$ErrorActionPreference = "Stop"

Invoke-RestMethod -Method Get -Uri "http://127.0.0.1:3100/ready"

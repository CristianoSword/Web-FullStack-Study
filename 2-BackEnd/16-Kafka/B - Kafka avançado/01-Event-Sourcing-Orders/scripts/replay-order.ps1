$ErrorActionPreference = "Stop"

Invoke-RestMethod -Method Post -Uri "http://localhost:4410/orders/ORDER-2001/replay"

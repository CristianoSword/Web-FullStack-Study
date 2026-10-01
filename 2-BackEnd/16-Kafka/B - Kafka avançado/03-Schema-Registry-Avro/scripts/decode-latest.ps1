$ErrorActionPreference = "Stop"

Invoke-RestMethod -Method Get -Uri "http://localhost:4610/events/avro/decode-latest"

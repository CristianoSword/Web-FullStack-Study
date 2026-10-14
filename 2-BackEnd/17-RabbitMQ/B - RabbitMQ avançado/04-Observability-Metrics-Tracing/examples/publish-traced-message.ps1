$body = @{
  eventName = "invoice.generated"
  queue = "observability.jobs"
  service = "billing-api"
  processingDelayMs = 400
  payload = @{
    invoiceId = "inv-001"
    amount = 149.90
    currency = "USD"
  }
} | ConvertTo-Json -Depth 5

$traceId = [guid]::NewGuid().ToString()

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:3074/messages/publish" `
  -Headers @{ "x-trace-id" = $traceId } `
  -ContentType "application/json" `
  -Body $body

$body = @{
  paymentId = "PAY-9001"
} | ConvertTo-Json

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:4410/orders/ORDER-2001/pay" `
  -ContentType "application/json" `
  -Body $body

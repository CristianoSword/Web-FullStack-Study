$body = @{
  customerId = "cust-001"
  items = @(
    @{
      sku = "keyboard-mech"
      quantity = 1
      price = 149.90
    },
    @{
      sku = "mouse-wireless"
      quantity = 2
      price = 39.90
    }
  )
  flags = @{
    paymentShouldFail = $true
  }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:3073/orders" `
  -ContentType "application/json" `
  -Body $body

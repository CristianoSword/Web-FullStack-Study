$ErrorActionPreference = "Stop"

$payload = @{
  customerId = "customer-2001"
  items = @(
    @{
      sku = "notebook-stand"
      quantity = 1
      unitPrice = 129.90
    },
    @{
      sku = "usb-c-dock"
      quantity = 1
      unitPrice = 399.90
    }
  )
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Method Post -Uri "http://localhost:4810/orders" -ContentType "application/json" -Body $payload

$body = @{
  eventName = "order.accepted"
  queue = "cluster.orders.quorum"
  payload = @{
    orderId = "ord-001"
    amount = 89.50
  }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:3075/cluster/messages" `
  -ContentType "application/json" `
  -Body $body

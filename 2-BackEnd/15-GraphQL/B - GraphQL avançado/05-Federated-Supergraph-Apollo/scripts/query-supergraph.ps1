$body = @{
  query = "query ProductsWithSellerAndReviews { products { id title seller { id name team } reviews { id rating body author { id name } } } }"
} | ConvertTo-Json -Compress

Invoke-RestMethod `
  -Uri "http://localhost:4205/graphql" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body

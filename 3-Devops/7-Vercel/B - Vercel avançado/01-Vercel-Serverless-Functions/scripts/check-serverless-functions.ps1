$commands = [ordered]@{
    Dev          = "vercel dev"
    Health       = "http://localhost:3000/api/health"
    Products     = "http://localhost:3000/api/products"
    ProductBySlug = "http://localhost:3000/api/products?slug=serverless-handbook"
    CreateOrder  = "Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/orders -Body '{""customerEmail"":""student@example.com"",""items"":[{""slug"":""serverless-handbook"",""quantity"":1}]}' -ContentType 'application/json'"
}

[pscustomobject]$commands

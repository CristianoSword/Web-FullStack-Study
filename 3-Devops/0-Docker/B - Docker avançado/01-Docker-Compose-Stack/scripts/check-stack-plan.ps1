$ErrorActionPreference = "Stop"

[pscustomobject]@{
  ComposeUp = "docker compose up --build -d"
  ApiHealth = "curl http://127.0.0.1:3040/health"
  CreateProduct = "curl -X POST http://127.0.0.1:3040/products -H `"Content-Type: application/json`" -d '{`"sku`":`"MON-200`",`"name`":`"Desk Lamp`",`"price`":59.9}'"
  RedisPing = "docker exec docker-compose-stack-redis redis-cli ping"
  PostgresCheck = "docker exec docker-compose-stack-postgres psql -U study -d study_stack -c `"select * from products;`""
}

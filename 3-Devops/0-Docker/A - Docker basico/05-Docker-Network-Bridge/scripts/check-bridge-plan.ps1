$ErrorActionPreference = "Stop"

[pscustomobject]@{
  ComposeUp = "docker compose up --build -d"
  InspectNetwork = "docker network inspect inventory_bridge"
  GatewayCall = "curl http://127.0.0.1:3030/catalog"
  IntraContainerCall = "docker exec docker-bridge-gateway wget -qO- http://catalog-service:3031/products"
}

$ErrorActionPreference = "Stop"

docker pull localhost:5001/study/inventory-release-api:v1.0.0
docker image inspect localhost:5001/study/inventory-release-api:v1.0.0

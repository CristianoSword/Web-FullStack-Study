$ErrorActionPreference = "Stop"

docker push localhost:5001/study/inventory-release-api:v1.0.0
docker tag inventory-release-api:local localhost:5001/study/inventory-release-api:latest
docker push localhost:5001/study/inventory-release-api:latest

$ErrorActionPreference = "Stop"

[pscustomobject]@{
  StartRegistry = "docker compose -f compose.registry.yaml up -d"
  Build = "docker build -t inventory-release-api:local -f Dockerfile ."
  TagVersion = "docker tag inventory-release-api:local localhost:5001/study/inventory-release-api:v1.0.0"
  PushVersion = "docker push localhost:5001/study/inventory-release-api:v1.0.0"
  PushLatest = "docker push localhost:5001/study/inventory-release-api:latest"
  PullVerify = "docker pull localhost:5001/study/inventory-release-api:v1.0.0"
}

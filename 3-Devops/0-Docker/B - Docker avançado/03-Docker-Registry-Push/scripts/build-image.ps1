$ErrorActionPreference = "Stop"

docker build -t inventory-release-api:local -f Dockerfile .

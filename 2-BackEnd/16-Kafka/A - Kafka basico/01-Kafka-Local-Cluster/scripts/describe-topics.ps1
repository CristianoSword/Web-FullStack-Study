$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

docker compose exec kafka-1 /opt/bitnami/kafka/bin/kafka-topics.sh `
  --bootstrap-server kafka-1:9092 `
  --describe

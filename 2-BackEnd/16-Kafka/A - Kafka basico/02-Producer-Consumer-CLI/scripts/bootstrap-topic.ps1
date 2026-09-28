$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

$config = Get-Content ".\config\topic-config.json" | ConvertFrom-Json

docker compose exec kafka /opt/bitnami/kafka/bin/kafka-topics.sh `
  --bootstrap-server kafka:9092 `
  --create `
  --if-not-exists `
  --topic $config.topic `
  --partitions $config.partitions `
  --replication-factor $config.replicationFactor

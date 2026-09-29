$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

$config = Get-Content ".\config\explorer-config.json" | ConvertFrom-Json

foreach ($topic in $config.sampleTopics) {
  docker compose exec kafka /opt/bitnami/kafka/bin/kafka-topics.sh `
    --bootstrap-server kafka:9092 `
    --create `
    --if-not-exists `
    --topic $topic.name `
    --partitions $topic.partitions `
    --replication-factor $topic.replicationFactor
}

node .\scripts\seed-group-state.mjs

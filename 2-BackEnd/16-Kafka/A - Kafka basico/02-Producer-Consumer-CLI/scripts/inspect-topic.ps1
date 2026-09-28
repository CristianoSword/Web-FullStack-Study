$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

$config = Get-Content ".\config\topic-config.json" | ConvertFrom-Json

docker compose exec kafka /opt/bitnami/kafka/bin/kafka-topics.sh `
  --bootstrap-server kafka:9092 `
  --describe `
  --topic $config.topic

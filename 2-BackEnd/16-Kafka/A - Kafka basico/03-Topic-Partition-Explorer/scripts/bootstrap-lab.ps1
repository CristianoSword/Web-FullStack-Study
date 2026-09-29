$ErrorActionPreference = "Stop"

function Assert-LastExitCode {
  param(
    [string]$Operation
  )

  if ($LASTEXITCODE -ne 0) {
    throw "$Operation failed with exit code $LASTEXITCODE."
  }
}

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
  Assert-LastExitCode "topic bootstrap for $($topic.name)"
}

node .\scripts\seed-group-state.mjs
Assert-LastExitCode "seed-group-state"

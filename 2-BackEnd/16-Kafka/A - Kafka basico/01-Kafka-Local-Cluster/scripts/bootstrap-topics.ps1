$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

$topicFiles = Get-ChildItem ".\topics\*.json"

foreach ($file in $topicFiles) {
  $topic = Get-Content $file.FullName | ConvertFrom-Json

  $command = @(
    "/opt/bitnami/kafka/bin/kafka-topics.sh",
    "--bootstrap-server", "kafka-1:9092",
    "--create",
    "--if-not-exists",
    "--topic", $topic.name,
    "--partitions", [string]$topic.partitions,
    "--replication-factor", [string]$topic.replicationFactor
  )

  foreach ($property in $topic.configs.PSObject.Properties) {
    $command += "--config"
    $command += "$($property.Name)=$($property.Value)"
  }

  docker compose exec kafka-1 $command
}

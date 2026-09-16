param(
  [ValidateSet("commit", "rollback")]
  [string]$Mode = "commit"
)

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

$scriptFile = if ($Mode -eq "rollback") {
  ".\transactions\rollback-transfer.mongodb.js"
} else {
  ".\transactions\commit-transfer.mongodb.js"
}

$remoteFile = if ($Mode -eq "rollback") {
  "/workspaces/rollback-transfer.mongodb.js"
} else {
  "/workspaces/commit-transfer.mongodb.js"
}

docker cp $scriptFile "mongodb-rs1:$remoteFile"
docker compose exec mongo1 mongosh --host mongo1/bank_ops --file $remoteFile

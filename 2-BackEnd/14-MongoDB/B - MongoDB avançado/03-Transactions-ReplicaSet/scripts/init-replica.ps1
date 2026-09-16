$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

docker compose exec mongo1 mongosh --file /workspaces/init-replica.js

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

docker cp ".\replica-set\init-replica.js" mongodb-rs1:/workspaces/init-replica.js
docker compose exec mongo1 mongosh --file /workspaces/init-replica.js

docker cp ".\seed\01-init.js" mongodb-rs1:/workspaces/01-init.js
docker compose exec mongo1 mongosh --host mongo1 --eval "db.getSiblingDB('admin').runCommand({ ping: 1 })"
docker compose exec mongo1 mongosh --host mongo1/bank_ops --file /workspaces/01-init.js

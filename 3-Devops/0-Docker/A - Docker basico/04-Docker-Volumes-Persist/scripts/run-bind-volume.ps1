$ErrorActionPreference = "Stop"

$runtimeData = Join-Path $PSScriptRoot "..\\runtime-data"
New-Item -ItemType Directory -Force -Path $runtimeData | Out-Null

docker run --rm `
  --name docker-volumes-persist-bind `
  -p 4020:3020 `
  -e APP_PORT=3020 `
  -e DATA_DIR=/data `
  -e DB_PATH=/data/inventory.db `
  -v "${runtimeData}:/data" `
  docker-volumes-persist-lab:local

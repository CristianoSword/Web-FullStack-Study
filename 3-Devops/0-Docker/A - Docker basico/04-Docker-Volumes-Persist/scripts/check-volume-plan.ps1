$ErrorActionPreference = "Stop"

[pscustomobject]@{
  Build = "docker build -t docker-volumes-persist-lab:local -f Dockerfile ."
  ComposeUp = "docker compose up --build -d"
  NamedVolume = "docker volume inspect inventory_data"
  BindMount = "docker run --rm -p 4020:3020 -e APP_PORT=3020 -e DB_PATH=/data/inventory.db -v ${PWD}\\runtime-data:/data docker-volumes-persist-lab:local"
}

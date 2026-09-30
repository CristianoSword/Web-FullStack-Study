$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

docker compose down -v

if ($LASTEXITCODE -ne 0) {
  throw "docker compose down failed with exit code $LASTEXITCODE."
}

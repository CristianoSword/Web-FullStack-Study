$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

node .\src\cli\consumer-worker.mjs worker-b

if ($LASTEXITCODE -ne 0) {
  throw "worker-b failed with exit code $LASTEXITCODE."
}

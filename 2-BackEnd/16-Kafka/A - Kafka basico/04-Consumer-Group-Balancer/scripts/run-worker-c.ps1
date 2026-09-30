$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

node .\src\cli\consumer-worker.mjs worker-c

if ($LASTEXITCODE -ne 0) {
  throw "worker-c failed with exit code $LASTEXITCODE."
}

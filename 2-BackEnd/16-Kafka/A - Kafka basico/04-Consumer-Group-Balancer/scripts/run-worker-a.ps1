$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

node .\src\cli\consumer-worker.mjs worker-a

if ($LASTEXITCODE -ne 0) {
  throw "worker-a failed with exit code $LASTEXITCODE."
}

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

node .\src\cli\coordinator.mjs

if ($LASTEXITCODE -ne 0) {
  throw "coordinator failed with exit code $LASTEXITCODE."
}

$ErrorActionPreference = "Stop"

param(
  [Parameter(Mandatory = $true)]
  [string]$WorkerId
)

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

node .\src\cli\consumer-worker.mjs $WorkerId

if ($LASTEXITCODE -ne 0) {
  throw "worker $WorkerId failed with exit code $LASTEXITCODE."
}

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

node .\src\cli\explorer.mjs groups

if ($LASTEXITCODE -ne 0) {
  throw "groups exploration failed with exit code $LASTEXITCODE."
}

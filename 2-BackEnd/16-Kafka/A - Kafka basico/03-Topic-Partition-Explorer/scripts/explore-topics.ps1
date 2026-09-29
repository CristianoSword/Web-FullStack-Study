$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

node .\src\cli\explorer.mjs topics

if ($LASTEXITCODE -ne 0) {
  throw "topics exploration failed with exit code $LASTEXITCODE."
}

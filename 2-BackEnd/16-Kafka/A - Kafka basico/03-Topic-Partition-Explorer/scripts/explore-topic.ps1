$ErrorActionPreference = "Stop"

param(
  [Parameter(Mandatory = $true)]
  [string]$TopicName
)

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

node .\src\cli\explorer.mjs topic $TopicName

if ($LASTEXITCODE -ne 0) {
  throw "topic exploration failed with exit code $LASTEXITCODE."
}

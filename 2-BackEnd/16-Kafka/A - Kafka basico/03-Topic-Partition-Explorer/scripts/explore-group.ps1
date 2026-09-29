param(
  [Parameter(Mandatory = $true)]
  [string]$GroupId
)

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

node .\src\cli\explorer.mjs group $GroupId

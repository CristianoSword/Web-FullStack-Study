$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

node .\src\server.mjs

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

if (-not (Test-Path ".\\build\\tcp_server_sockets.exe")) {
  powershell -ExecutionPolicy Bypass -File .\scripts\build.ps1
}

.\build\tcp_server_sockets.exe

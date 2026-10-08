$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

cmake -S . -B build -G "MinGW Makefiles"
if ($LASTEXITCODE -ne 0) { throw "cmake configure failed" }

cmake --build build
if ($LASTEXITCODE -ne 0) { throw "cmake build failed" }

Write-Host "Build concluido em build\\tcp_server_sockets.exe"

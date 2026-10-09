$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

$compiler = (Get-Command g++ -ErrorAction Stop).Source
New-Item -ItemType Directory -Force ".\\build" | Out-Null

& $compiler `
  -std=c++17 `
  -Wall `
  -Wextra `
  -pedantic `
  -Iinclude `
  src/main.cpp `
  src/server_state.cpp `
  src/server_command.cpp `
  src/chat_server.cpp `
  src/socket_guard.cpp `
  -lws2_32 `
  -o build/tcp_server_sockets.exe
if ($LASTEXITCODE -ne 0) { throw "g++ build failed" }

Write-Host "Build concluido em build\\tcp_server_sockets.exe"

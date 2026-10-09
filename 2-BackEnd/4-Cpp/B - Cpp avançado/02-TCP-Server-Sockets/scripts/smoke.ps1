param(
  [int]$Port = 9091
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

powershell -ExecutionPolicy Bypass -File .\scripts\build.ps1

$server = Start-Process `
  -FilePath ".\build\tcp_server_sockets.exe" `
  -ArgumentList @("--host", "127.0.0.1", "--port", $Port, "--max-clients", "4") `
  -WindowStyle Hidden `
  -PassThru

Start-Sleep -Seconds 1

try {
  & .\scripts\sample-client.ps1 `
    -Port $Port `
    -Messages @("/nick smoke_user", "hello from smoke test", "/who", "/history 5", "/quit")
} finally {
  if (-not $server.HasExited) {
    Stop-Process -Id $server.Id -Force
  }
}

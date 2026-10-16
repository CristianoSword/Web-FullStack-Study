$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$dockerfile = Join-Path $root "images\lab-web\Dockerfile"

Write-Host "Dockerfile located at: $dockerfile"
Write-Host "Copy .env.example to .env if you want to override defaults."

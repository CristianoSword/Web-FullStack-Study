$ErrorActionPreference = "Stop"
Import-Module (Join-Path $PSScriptRoot "..\src\DockerCliLab.psm1") -Force
Invoke-DockerLabAction -Action list

$ErrorActionPreference = "Stop"
Import-Module (Join-Path $PSScriptRoot "..\src\DockerCliLab.psm1") -Force

"build", "run", "list", "inspect", "logs", "stop", "remove" | ForEach-Object {
  Invoke-DockerLabAction -Action $_ -PlanOnly
}

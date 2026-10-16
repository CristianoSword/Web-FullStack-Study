$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$requiredFiles = @(
  "app\index.html",
  "app\health.txt",
  "config\lab.settings.json",
  "config\lab-manifest.json",
  "images\lab-web\Dockerfile",
  "models\command-catalog.json",
  "models\container-profile.json",
  "models\lab-state.schema.json",
  "src\DockerCliLab.psm1",
  "scripts\build-image.ps1",
  "scripts\run-container.ps1",
  "scripts\list-containers.ps1",
  "scripts\stop-container.ps1",
  "scripts\remove-container.ps1",
  "scripts\show-logs.ps1",
  "scripts\inspect-container.ps1",
  "scripts\check-docker-daemon.ps1",
  "scripts\show-command-plan.ps1"
)

foreach ($relativePath in $requiredFiles) {
  $fullPath = Join-Path $root $relativePath
  if (-not (Test-Path $fullPath)) {
    throw "Missing file: $relativePath"
  }
}

$parseTargets = Get-ChildItem -Path (Join-Path $root "scripts"), (Join-Path $root "src") -Filter *.ps1 -Recurse
$parseTargets += Get-ChildItem -Path (Join-Path $root "src") -Filter *.psm1 -Recurse

foreach ($target in $parseTargets | Select-Object -Unique) {
  $tokens = $null
  $errors = $null
  [System.Management.Automation.Language.Parser]::ParseFile($target.FullName, [ref]$tokens, [ref]$errors) | Out-Null

  if ($errors.Count -gt 0) {
    throw "PowerShell parse failed for $($target.FullName): $($errors[0].Message)"
  }
}

$dockerfilePath = Join-Path $root "images\lab-web\Dockerfile"
$dockerfile = Get-Content -Raw $dockerfilePath
if ($dockerfile -notmatch "^FROM\s+nginx:1.29-alpine") {
  throw "Unexpected base image in Dockerfile."
}

Write-Host "Docker CLI lab validation passed."

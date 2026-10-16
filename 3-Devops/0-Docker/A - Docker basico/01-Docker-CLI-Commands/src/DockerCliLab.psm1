Set-StrictMode -Version Latest

function Get-LabRoot {
  Split-Path -Parent $PSScriptRoot
}

function Get-LabSettings {
  $settingsPath = Join-Path (Get-LabRoot) "config\lab.settings.json"
  $settings = Get-Content -Raw $settingsPath | ConvertFrom-Json

  [pscustomobject]@{
    ContainerName = [string]$settings.containerName
    ImageName = [string]$settings.imageName
    HostPort = [int]$settings.hostPort
    ContainerPort = [int]$settings.containerPort
    DockerfilePath = [string]$settings.dockerfilePath
    ApplicationContext = [string]$settings.applicationContext
  }
}

function Get-DockerCommandPlan {
  param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("build", "run", "list", "stop", "remove", "logs", "inspect")]
    [string]$Action
  )

  $settings = Get-LabSettings

  switch ($Action) {
    "build" {
      return @("build", "-t", $settings.ImageName, "-f", $settings.DockerfilePath, $settings.ApplicationContext)
    }
    "run" {
      return @("run", "-d", "--name", $settings.ContainerName, "-p", "$($settings.HostPort):$($settings.ContainerPort)", $settings.ImageName)
    }
    "list" {
      return @("ps", "--filter", "name=$($settings.ContainerName)")
    }
    "stop" {
      return @("stop", $settings.ContainerName)
    }
    "remove" {
      return @("rm", "-f", $settings.ContainerName)
    }
    "logs" {
      return @("logs", $settings.ContainerName)
    }
    "inspect" {
      return @("inspect", $settings.ContainerName)
    }
  }
}

function Test-DockerDaemon {
  try {
    $null = Get-Command docker -ErrorAction Stop

    $stdoutPath = Join-Path $env:TEMP "docker-cli-lab-version.out"
    $stderrPath = Join-Path $env:TEMP "docker-cli-lab-version.err"

    $process = Start-Process -FilePath "docker" -ArgumentList @("version") -NoNewWindow -Wait -PassThru -RedirectStandardOutput $stdoutPath -RedirectStandardError $stderrPath
    return $process.ExitCode -eq 0
  }
  catch {
    return $false
  }
}

function Format-DockerCommand {
  param(
    [Parameter(Mandatory = $true)]
    [string[]]$Arguments
  )

  $formatted = $Arguments | ForEach-Object {
    if ($_ -match "\s") { '"' + $_ + '"' } else { $_ }
  }

  "docker " + [string]::Join(" ", $formatted)
}

function Invoke-DockerLabAction {
  param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("build", "run", "list", "stop", "remove", "logs", "inspect")]
    [string]$Action,

    [switch]$PlanOnly
  )

  $arguments = Get-DockerCommandPlan -Action $Action
  $commandText = Format-DockerCommand -Arguments $arguments

  if ($PlanOnly -or -not (Test-DockerDaemon)) {
    return [pscustomobject]@{
      Mode = if ($PlanOnly) { "plan-only" } else { "daemon-unavailable" }
      Command = $commandText
      Action = $Action
    }
  }

  & docker @arguments

  return [pscustomobject]@{
    Mode = "executed"
    Command = $commandText
    Action = $Action
  }
}

Export-ModuleMember -Function Get-LabSettings, Get-DockerCommandPlan, Format-DockerCommand, Invoke-DockerLabAction, Test-DockerDaemon

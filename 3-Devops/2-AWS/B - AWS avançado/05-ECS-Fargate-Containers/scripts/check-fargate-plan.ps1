$root = Split-Path -Parent $PSScriptRoot
$settings = Get-Content (Join-Path $root 'config/settings.json') | ConvertFrom-Json
$network = Get-Content (Join-Path $root 'config/network.json') | ConvertFrom-Json
$scaling = Get-Content (Join-Path $root 'config/scaling.json') | ConvertFrom-Json

[pscustomobject]@{
  BuildImage        = "docker build -t $($settings.repositoryName):latest ."
  PushImage         = "aws ecr get-login-password --region $($settings.region) | docker login --username AWS --password-stdin <account>.dkr.ecr.$($settings.region).amazonaws.com"
  RegisterTask      = 'aws ecs register-task-definition --cli-input-json file://infra/task-definition.json'
  UpdateService     = "aws ecs update-service --cluster $($settings.clusterName) --service $($settings.serviceName) --force-new-deployment"
  NetworkMode       = "awsvpc on $($network.privateSubnets -join ', ')"
  AutoscalingWindow = "$($scaling.minTasks) <= tasks <= $($scaling.maxTasks) | CPU $($scaling.cpuTarget)% | Memory $($scaling.memoryTarget)%"
} | Format-List

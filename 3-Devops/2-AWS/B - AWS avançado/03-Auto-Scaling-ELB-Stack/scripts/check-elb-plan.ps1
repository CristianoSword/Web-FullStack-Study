$root = Split-Path -Parent $PSScriptRoot
$settings = Get-Content (Join-Path $root 'config/settings.json') | ConvertFrom-Json
$instances = Get-Content (Join-Path $root 'config/instances.json') | ConvertFrom-Json
$policies = Get-Content (Join-Path $root 'config/scaling-policies.json') | ConvertFrom-Json

[pscustomobject]@{
  DeployStack         = "aws cloudformation deploy --template-file cloudformation/stack.yaml --stack-name $($settings.stackName) --capabilities CAPABILITY_IAM"
  AlbHealthCheckPath  = $instances.healthCheckPath
  CapacityWindow      = "$($instances.minSize) <= desired $($instances.desiredCapacity) <= $($instances.maxSize)"
  ScalePolicies       = ($policies | ForEach-Object { "$($_.name):$($_.metric)=$($_.targetValue)" }) -join '; '
  InspectTargets      = 'aws elbv2 describe-target-health --target-group-arn <target-group-arn>'
} | Format-List

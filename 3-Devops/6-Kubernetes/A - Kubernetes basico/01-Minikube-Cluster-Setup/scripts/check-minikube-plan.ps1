$root = Split-Path -Parent $PSScriptRoot
$profile = Get-Content (Join-Path $root 'config/minikube-profile.json') | ConvertFrom-Json
$addons = Get-Content (Join-Path $root 'config/addons.json') | ConvertFrom-Json

[pscustomobject]@{
  StartCluster = "minikube start --profile $($profile.profile) --driver=$($profile.driver) --cpus=$($profile.cpus) --memory=$($profile.memoryMb) --kubernetes-version=$($profile.kubernetesVersion) --container-runtime=$($profile.containerRuntime)"
  EnableAddons = ($addons | ForEach-Object { "minikube addons enable $($_.name) --profile $($profile.profile)" }) -join '; '
  ApplyFiles   = 'kubectl apply -f k8s/namespace.yaml -f k8s/configmap.yaml -f k8s/deployment.yaml -f k8s/service.yaml'
  Rollout      = 'kubectl rollout status deployment/study-web -n study-local --timeout=90s'
  ServiceUrl   = "minikube service study-web-service -n study-local --url --profile $($profile.profile)"
} | Format-List

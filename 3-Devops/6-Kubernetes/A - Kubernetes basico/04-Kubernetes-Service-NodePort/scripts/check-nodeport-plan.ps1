$root = Split-Path -Parent $PSScriptRoot
$service = Get-Content (Join-Path $root 'config/service-spec.json') | ConvertFrom-Json

[pscustomobject]@{
  ApplyFiles  = 'kubectl apply -f k8s/namespace.yaml -f k8s/deployment.yaml -f k8s/service.yaml'
  Rollout     = "kubectl rollout status deployment/$($service.deploymentName) -n $($service.namespace) --timeout=90s"
  DescribeSvc = "kubectl describe svc $($service.serviceName) -n $($service.namespace)"
  Url         = "minikube service $($service.serviceName) -n $($service.namespace) --url"
  Curl        = "curl http://127.0.0.1:$($service.nodePort)/"
} | Format-List

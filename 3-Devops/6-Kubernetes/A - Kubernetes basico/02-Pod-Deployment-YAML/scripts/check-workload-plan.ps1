$root = Split-Path -Parent $PSScriptRoot
$workload = Get-Content (Join-Path $root 'config/workload-spec.json') | ConvertFrom-Json

[pscustomobject]@{
  ApplyFiles      = 'kubectl apply -f k8s/namespace.yaml -f k8s/pod.yaml -f k8s/deployment.yaml -f k8s/service.yaml'
  CheckPod        = "kubectl get pod study-nginx-pod -n $($workload.namespace)"
  CheckDeployment = "kubectl rollout status deployment/study-nginx-deployment -n $($workload.namespace) --timeout=90s"
  CheckService    = "kubectl get svc study-nginx-service -n $($workload.namespace)"
  ServiceUrl      = "minikube service study-nginx-service -n $($workload.namespace) --url"
} | Format-List

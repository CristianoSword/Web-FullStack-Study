$root = Split-Path -Parent $PSScriptRoot
$cluster = Get-Content (Join-Path $root 'config/cluster-spec.json') | ConvertFrom-Json
$app = Get-Content (Join-Path $root 'config/app-spec.json') | ConvertFrom-Json

[pscustomobject]@{
  SaveKubeconfig = "doctl kubernetes cluster kubeconfig save $($cluster.name)"
  ApplyNamespace = 'kubectl apply -f k8s/namespace.yaml'
  ApplyWorkload  = 'kubectl apply -f k8s/configmap.yaml -f k8s/secret.yaml -f k8s/deployment.yaml -f k8s/service.yaml -f k8s/ingress.yaml -f k8s/hpa.yaml'
  RolloutStatus  = "kubectl rollout status deployment/$($app.deploymentName) -n $($app.namespace)"
  GetIngress     = "kubectl get ingress -n $($app.namespace)"
} | Format-List

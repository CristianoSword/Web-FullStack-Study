$root = Split-Path -Parent $PSScriptRoot
$spec = Get-Content (Join-Path $root 'config/configmap-spec.json') | ConvertFrom-Json

[pscustomobject]@{
  ApplyFiles    = 'kubectl apply -f k8s/namespace.yaml -f k8s/configmap.yaml -f k8s/deployment.yaml -f k8s/service.yaml'
  DescribeMap   = "kubectl describe configmap $($spec.configMapName) -n $($spec.namespace)"
  Rollout       = "kubectl rollout status deployment/$($spec.deploymentName) -n $($spec.namespace) --timeout=90s"
  InspectAppEnv = "kubectl exec -n $($spec.namespace) <pod-name> -- printenv APP_NAME"
  InspectMsg    = "kubectl exec -n $($spec.namespace) <pod-name> -- printenv EXPLICIT_WELCOME_MESSAGE"
} | Format-List

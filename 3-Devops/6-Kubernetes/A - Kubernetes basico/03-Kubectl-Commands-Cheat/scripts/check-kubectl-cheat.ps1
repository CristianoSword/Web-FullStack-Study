$root = Split-Path -Parent $PSScriptRoot
$context = Get-Content (Join-Path $root 'config/cluster-context.json') | ConvertFrom-Json

[pscustomobject]@{
  Inspection = "kubectl get pods -n $($context.namespace); kubectl describe deployment $($context.deploymentName) -n $($context.namespace); kubectl get svc $($context.serviceName) -n $($context.namespace)"
  Debugging  = "kubectl logs deployment/$($context.deploymentName) -n $($context.namespace); kubectl exec -it deploy/$($context.deploymentName) -n $($context.namespace) -- sh; kubectl port-forward svc/$($context.serviceName) 8080:80 -n $($context.namespace)"
  Operations = "kubectl scale deployment $($context.deploymentName) --replicas=3 -n $($context.namespace); kubectl rollout status deployment/$($context.deploymentName) -n $($context.namespace)"
} | Format-List

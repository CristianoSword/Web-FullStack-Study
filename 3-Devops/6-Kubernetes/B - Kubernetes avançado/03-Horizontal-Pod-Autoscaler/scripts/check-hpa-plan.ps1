$commands = [ordered]@{
    ApplyFiles   = "kubectl apply -f k8s/namespace.yaml -f k8s/configmap.yaml -f k8s/deployment.yaml -f k8s/service.yaml -f k8s/hpa.yaml"
    Rollout      = "kubectl rollout status deployment/metrics-api -n study-hpa --timeout=180s"
    GenerateLoad = "kubectl apply -f k8s/load-generator-job.yaml"
    WatchHpa     = "kubectl get hpa metrics-api -n study-hpa -w"
    InspectTop   = "kubectl top pods -n study-hpa"
}

[pscustomobject]$commands

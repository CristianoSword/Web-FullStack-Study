$commands = [ordered]@{
    ApplyFiles      = "kubectl apply -f k8s/namespace.yaml -f k8s/configmap.yaml -f k8s/deployment.yaml -f k8s/service.yaml -f k8s/pod-disruption-budget.yaml"
    RolloutStatus   = "kubectl rollout status deployment/catalog-api -n study-rolling --timeout=180s"
    RolloutHistory  = "kubectl rollout history deployment/catalog-api -n study-rolling"
    ChangeImage     = "kubectl set image deployment/catalog-api catalog-api=ghcr.io/studies/catalog-api:v2 -n study-rolling"
    VerifyService   = "kubectl get svc,endpoints -n study-rolling"
    Rollback        = "kubectl rollout undo deployment/catalog-api -n study-rolling"
}

[pscustomobject]$commands

$commands = [ordered]@{
    ApplyFiles     = "kubectl apply -f k8s/namespace.yaml -f k8s/secret.yaml -f k8s/configmap.yaml -f k8s/deployment.yaml -f k8s/service.yaml"
    Rollout        = "kubectl rollout status deployment/payments-api -n study-secrets --timeout=180s"
    CheckEnv       = "kubectl exec -n study-secrets deploy/payments-api -- printenv DB_USERNAME"
    CheckMount     = "kubectl exec -n study-secrets deploy/payments-api -- sh -c ""ls -la /var/run/secrets/app && cat /var/run/secrets/app/signing-token"""
    DescribeSecret = "kubectl describe secret payments-api-secret -n study-secrets"
}

[pscustomobject]$commands

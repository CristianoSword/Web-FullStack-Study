$commands = [ordered]@{
    ApplyStorage  = "kubectl apply -f k8s/namespace.yaml -f k8s/persistent-volume.yaml -f k8s/persistent-volume-claim.yaml"
    ApplyWorkload = "kubectl apply -f k8s/configmap.yaml -f k8s/headless-service.yaml -f k8s/statefulset.yaml -f k8s/service.yaml"
    Rollout       = "kubectl rollout status statefulset/notes-api -n study-storage --timeout=180s"
    CheckClaims   = "kubectl get pv,pvc -n study-storage"
    CheckFiles    = "kubectl exec -n study-storage notes-api-0 -- sh -c ""ls -la /data && cat /data/notes.json"""
}

[pscustomobject]$commands

$commands = [ordered]@{
    ApplyFiles    = "kubectl apply -f k8s/namespace.yaml -f k8s/web-deployment.yaml -f k8s/web-service.yaml -f k8s/api-deployment.yaml -f k8s/api-service.yaml -f k8s/ingress.yaml"
    GetIngress    = "kubectl get ingress study-routes -n study-ingress"
    CurlRoot      = "curl -H ""Host: study.local"" http://<INGRESS_IP>/"
    CurlApi       = "curl -H ""Host: study.local"" http://<INGRESS_IP>/api/orders"
    DescribeRoute = "kubectl describe ingress study-routes -n study-ingress"
}

[pscustomobject]$commands

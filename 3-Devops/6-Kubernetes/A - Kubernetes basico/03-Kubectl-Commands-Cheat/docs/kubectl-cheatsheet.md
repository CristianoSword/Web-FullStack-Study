# Kubectl Commands Cheat

## Inspection

- `kubectl get pods -n study-cheat`
- `kubectl get deployments -n study-cheat`
- `kubectl describe deployment cheat-web-deployment -n study-cheat`
- `kubectl get svc cheat-web-service -n study-cheat`

## Debugging

- `kubectl logs deployment/cheat-web-deployment -n study-cheat`
- `kubectl exec -it deploy/cheat-web-deployment -n study-cheat -- sh`
- `kubectl port-forward svc/cheat-web-service 8080:80 -n study-cheat`

## Operations

- `kubectl scale deployment cheat-web-deployment --replicas=3 -n study-cheat`
- `kubectl rollout status deployment/cheat-web-deployment -n study-cheat`
- `kubectl delete -f k8s/service.yaml -f k8s/deployment.yaml -f k8s/namespace.yaml`

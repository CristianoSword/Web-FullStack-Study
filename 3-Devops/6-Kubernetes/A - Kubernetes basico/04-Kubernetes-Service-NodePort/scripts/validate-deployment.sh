#!/bin/bash
# Validate readiness of resources
echo "Validating 04-Kubernetes-Service-NodePort K8s Deployment..."
kubectl rollout status deployment/04-kubernetes-service-nodeport --timeout=60s
if [ $? -eq 0 ]; then
  echo "Deployment ready."
else
  echo "Deployment validation failed!"
  exit 1
fi

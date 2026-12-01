#!/bin/bash
# Validate readiness of resources
echo "Validating 05-Kubernetes-Secrets-Inject K8s Deployment..."
kubectl rollout status deployment/05-kubernetes-secrets-inject --timeout=60s
if [ $? -eq 0 ]; then
  echo "Deployment ready."
else
  echo "Deployment validation failed!"
  exit 1
fi

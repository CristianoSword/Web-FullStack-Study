#!/bin/bash
# Validate readiness of resources
echo "Validating 03-Kubectl-Commands-Cheat K8s Deployment..."
kubectl rollout status deployment/03-kubectl-commands-cheat --timeout=60s
if [ $? -eq 0 ]; then
  echo "Deployment ready."
else
  echo "Deployment validation failed!"
  exit 1
fi

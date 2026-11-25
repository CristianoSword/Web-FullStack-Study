#!/bin/bash
# Validate readiness of resources
echo "Validating 02-Pod-Deployment-YAML K8s Deployment..."
kubectl rollout status deployment/02-pod-deployment-yaml --timeout=60s
if [ $? -eq 0 ]; then
  echo "Deployment ready."
else
  echo "Deployment validation failed!"
  exit 1
fi

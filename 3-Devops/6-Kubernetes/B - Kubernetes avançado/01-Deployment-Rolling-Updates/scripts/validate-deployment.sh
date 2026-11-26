#!/bin/bash
# Validate readiness of resources
echo "Validating 01-Deployment-Rolling-Updates K8s Deployment..."
kubectl rollout status deployment/01-deployment-rolling-updates --timeout=60s
if [ $? -eq 0 ]; then
  echo "Deployment ready."
else
  echo "Deployment validation failed!"
  exit 1
fi

#!/bin/bash
# Validate readiness of resources
echo "Validating 05-ConfigMaps-Env-Vars K8s Deployment..."
kubectl rollout status deployment/05-configmaps-env-vars --timeout=60s
if [ $? -eq 0 ]; then
  echo "Deployment ready."
else
  echo "Deployment validation failed!"
  exit 1
fi

#!/bin/bash
# Validate readiness of resources
echo "Validating 04-Ingress-Controller-Routing K8s Deployment..."
kubectl rollout status deployment/04-ingress-controller-routing --timeout=60s
if [ $? -eq 0 ]; then
  echo "Deployment ready."
else
  echo "Deployment validation failed!"
  exit 1
fi

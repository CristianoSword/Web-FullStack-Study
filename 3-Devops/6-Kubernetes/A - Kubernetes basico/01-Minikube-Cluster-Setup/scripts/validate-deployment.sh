#!/bin/bash
# Validate readiness of resources
echo "Validating 01-Minikube-Cluster-Setup K8s Deployment..."
kubectl rollout status deployment/01-minikube-cluster-setup --timeout=60s
if [ $? -eq 0 ]; then
  echo "Deployment ready."
else
  echo "Deployment validation failed!"
  exit 1
fi

#!/bin/bash
echo "Deploying 02-Pod-Deployment-YAML manifests to cluster..."
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get pods -l app=02-pod-deployment-yaml

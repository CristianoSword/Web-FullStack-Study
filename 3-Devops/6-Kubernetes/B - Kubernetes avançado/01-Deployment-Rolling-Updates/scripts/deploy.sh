#!/bin/bash
echo "Deploying 01-Deployment-Rolling-Updates manifests to cluster..."
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get pods -l app=01-deployment-rolling-updates

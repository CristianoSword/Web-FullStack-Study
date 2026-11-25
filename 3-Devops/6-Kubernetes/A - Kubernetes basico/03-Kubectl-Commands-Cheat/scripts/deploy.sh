#!/bin/bash
echo "Deploying 03-Kubectl-Commands-Cheat manifests to cluster..."
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get pods -l app=03-kubectl-commands-cheat

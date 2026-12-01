#!/bin/bash
echo "Deploying 05-Kubernetes-Secrets-Inject manifests to cluster..."
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get pods -l app=05-kubernetes-secrets-inject

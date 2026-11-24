#!/bin/bash
echo "Deploying 01-Minikube-Cluster-Setup manifests to cluster..."
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get pods -l app=01-minikube-cluster-setup

#!/bin/bash
echo "Deploying 04-Kubernetes-Service-NodePort manifests to cluster..."
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get pods -l app=04-kubernetes-service-nodeport

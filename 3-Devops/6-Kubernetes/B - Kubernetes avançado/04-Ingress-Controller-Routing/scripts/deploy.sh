#!/bin/bash
echo "Deploying 04-Ingress-Controller-Routing manifests to cluster..."
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get pods -l app=04-ingress-controller-routing

#!/usr/bin/env bash
set -euo pipefail

echo "[1/4] Inspecting project and VPC"
doctl projects list
doctl vpcs list

echo "[2/4] Creating study droplets"
doctl compute droplet create study-web-01 study-web-02 \
  --region nyc3 \
  --size s-1vcpu-2gb \
  --image ubuntu-24-04-x64 \
  --tag-names study-web

echo "[3/4] Ensuring firewall"
doctl compute firewall list

echo "[4/4] Ensuring load balancer"
doctl compute load-balancer list

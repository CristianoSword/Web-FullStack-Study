#!/usr/bin/env bash
set -euo pipefail

echo "Delete load balancer first, then firewall, then droplets."
echo "doctl compute load-balancer delete <lb-id>"
echo "doctl compute firewall delete <firewall-id>"
echo "doctl compute droplet delete <droplet-id-1> <droplet-id-2>"

#!/usr/bin/env bash
set -euo pipefail

doctl compute droplet list --tag-name study-web
doctl compute firewall list
doctl compute load-balancer list

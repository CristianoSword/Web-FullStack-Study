#!/usr/bin/env bash
set -euo pipefail

DEPLOY_PATH="${DEPLOY_PATH:-/opt/study-app}"
RELEASE_DIR="$DEPLOY_PATH/releases/$(date +%Y%m%d%H%M%S)"

mkdir -p "$RELEASE_DIR"
tar -xzf /tmp/release.tar.gz -C "$RELEASE_DIR"
ln -sfn "$RELEASE_DIR" "$DEPLOY_PATH/current"
cd "$DEPLOY_PATH/current"
npm ci --omit=dev
pm2 startOrReload ecosystem.config.cjs

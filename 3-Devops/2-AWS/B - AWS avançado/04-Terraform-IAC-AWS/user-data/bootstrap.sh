#!/bin/bash
set -euo pipefail

dnf update -y
dnf install -y docker
systemctl enable docker
systemctl start docker
cat <<'EOF' >/opt/app.env
PORT=8080
ENVIRONMENT=staging
EOF

#!/bin/bash
set -euo pipefail

dnf update -y
dnf install -y nginx
cat <<'EOF' >/usr/share/nginx/html/index.html
<html>
  <body>
    <h1>study-api</h1>
    <p>Auto Scaling group bootstrapped successfully.</p>
  </body>
</html>
EOF
systemctl enable nginx
systemctl restart nginx

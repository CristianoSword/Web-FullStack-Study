#!/usr/bin/env bash
set -euo pipefail

apt-get update
apt-get install -y nginx
cat <<'EOF' >/var/www/html/index.html
<html>
  <body>
    <h1>study-web-01 ready</h1>
    <p>Bootstrapped from Compute Engine startup script.</p>
  </body>
</html>
EOF
systemctl enable nginx
systemctl restart nginx

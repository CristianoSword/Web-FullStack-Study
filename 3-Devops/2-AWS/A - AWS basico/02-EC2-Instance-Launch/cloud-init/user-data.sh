#!/bin/bash
set -euxo pipefail

yum update -y
yum install -y httpd
systemctl enable httpd
cat > /var/www/html/index.html <<'EOF'
<html><body><h1>EC2 bootstrap complete</h1></body></html>
EOF
systemctl start httpd

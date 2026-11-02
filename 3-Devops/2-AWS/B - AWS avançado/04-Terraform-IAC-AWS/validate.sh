#!/bin/bash
echo "Running Terraform validation..."
terraform init -backend=false
terraform validate
if [ $? -eq 0 ]; then
  echo "Terraform configuration is valid!"
else
  echo "Terraform validation failed!"
  exit 1
fi

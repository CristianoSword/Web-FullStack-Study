$ErrorActionPreference = "Stop"

docker build -t secure-nonroot-audit:local -f Dockerfile .

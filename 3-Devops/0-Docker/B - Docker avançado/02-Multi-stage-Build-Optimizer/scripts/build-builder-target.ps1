$ErrorActionPreference = "Stop"

docker build --target builder -t multi-stage-build-optimizer:builder .

$ErrorActionPreference = "Stop"

docker build --target runtime -t multi-stage-build-optimizer:runtime .

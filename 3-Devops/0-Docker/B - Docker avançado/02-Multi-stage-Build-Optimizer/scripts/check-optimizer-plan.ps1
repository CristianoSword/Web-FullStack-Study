$ErrorActionPreference = "Stop"

[pscustomobject]@{
  BuilderTarget = "docker build --target builder -t multi-stage-build-optimizer:builder ."
  RuntimeTarget = "docker build --target runtime -t multi-stage-build-optimizer:runtime ."
  History = "docker history multi-stage-build-optimizer:runtime"
  Inspect = "docker image inspect multi-stage-build-optimizer:runtime"
  Test = "go test ./..."
}

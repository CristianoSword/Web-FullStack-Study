$ErrorActionPreference = "Stop"

[pscustomobject]@{
  Build = "docker build -t secure-nonroot-audit:local -f Dockerfile ."
  ComposeUp = "docker compose -f compose.secure.yaml up --build -d"
  InspectUser = "docker exec docker-security-nonroot-audit id"
  InspectMounts = "docker inspect docker-security-nonroot-audit"
  FilesystemCheck = "curl http://127.0.0.1:3070/filesystem-check"
}

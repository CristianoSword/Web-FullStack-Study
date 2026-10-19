$ErrorActionPreference = "Stop"

[pscustomobject]@{
  Build = "docker build -t nodejs-dockerfile-lab:local -f Dockerfile ."
  Run = "docker run -d --name nodejs-dockerfile-lab -p 3005:3000 --env-file .env.example nodejs-dockerfile-lab:local"
  Inspect = "docker image inspect nodejs-dockerfile-lab:local"
}

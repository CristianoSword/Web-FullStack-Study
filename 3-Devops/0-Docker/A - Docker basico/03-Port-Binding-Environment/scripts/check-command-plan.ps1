$ErrorActionPreference = "Stop"

[pscustomobject]@{
  Build = "docker build -t port-binding-environment-lab:local -f Dockerfile ."
  DefaultRun = "docker run -d --name port-binding-environment-lab-default -p 3010:3010 --env-file .env.example port-binding-environment-lab:local"
  AlternateRun = "docker run -d --name port-binding-environment-lab-alt -p 4010:3010 --env-file .env.example -e MESSAGE=`"Started on alternate host port`" port-binding-environment-lab:local"
}

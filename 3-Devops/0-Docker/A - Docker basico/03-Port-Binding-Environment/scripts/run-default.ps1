$ErrorActionPreference = "Stop"
docker run -d --name port-binding-environment-lab-default -p 3010:3010 --env-file .env.example port-binding-environment-lab:local

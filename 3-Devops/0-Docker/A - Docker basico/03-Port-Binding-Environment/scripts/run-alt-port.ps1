$ErrorActionPreference = "Stop"
docker run -d --name port-binding-environment-lab-alt -p 4010:3010 --env-file .env.example -e MESSAGE="Started on alternate host port" port-binding-environment-lab:local

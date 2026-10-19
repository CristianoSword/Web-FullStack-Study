$ErrorActionPreference = "Stop"
docker run -d --name nodejs-dockerfile-lab -p 3005:3000 --env-file .env.example nodejs-dockerfile-lab:local

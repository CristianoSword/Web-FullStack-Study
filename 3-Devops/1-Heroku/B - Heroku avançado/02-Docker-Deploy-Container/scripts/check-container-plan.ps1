$ErrorActionPreference = "Stop"

[pscustomobject]@{
  Login = "heroku container:login"
  Build = "docker build -t registry.heroku.com/study-container-web/web -f Dockerfile ."
  Push = "heroku container:push web --app study-container-web"
  Release = "heroku container:release web --app study-container-web"
  Logs = "heroku logs --tail --app study-container-web"
}

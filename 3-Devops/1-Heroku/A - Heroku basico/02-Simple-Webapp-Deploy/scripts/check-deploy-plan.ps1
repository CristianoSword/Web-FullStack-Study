$ErrorActionPreference = "Stop"

[pscustomobject]@{
  LocalRun = "node src/main.js"
  CreateApp = "heroku create heroku-simple-webapp-deploy"
  PushMain = "git push heroku main"
  OpenApp = "heroku open"
  Logs = "heroku logs --tail"
}

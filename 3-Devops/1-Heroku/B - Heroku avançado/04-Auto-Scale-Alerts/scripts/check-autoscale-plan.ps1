$ErrorActionPreference = "Stop"

[pscustomobject]@{
  ScaleOut = "heroku ps:scale web=3 --app study-autoscale-app"
  ShowFormation = "heroku ps --app study-autoscale-app"
  AttachDrain = "heroku drains:add https://logs.example.invalid/token --app study-autoscale-app"
  TailLogs = "heroku logs --tail --app study-autoscale-app"
  Metrics = "heroku addons:open librato --app study-autoscale-app"
}

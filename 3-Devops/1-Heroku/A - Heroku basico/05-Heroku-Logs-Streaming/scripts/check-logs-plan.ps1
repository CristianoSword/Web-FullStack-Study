$ErrorActionPreference = "Stop"

[pscustomobject]@{
  Tail = "heroku logs --tail --app study-log-stream-app"
  SourceFilter = "heroku logs --source app --app study-log-stream-app"
  DynoFilter = "heroku logs --dyno web.1 --app study-log-stream-app"
  RouterFilter = "heroku logs --source heroku --app study-log-stream-app"
}

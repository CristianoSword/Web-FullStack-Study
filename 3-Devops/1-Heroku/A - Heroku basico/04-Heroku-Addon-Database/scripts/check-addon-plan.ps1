$ErrorActionPreference = "Stop"

[pscustomobject]@{
  CreateAddon = "heroku addons:create heroku-postgresql:mini --app study-addon-db-app"
  ShowAddons = "heroku addons --app study-addon-db-app"
  ShowInfo = "heroku pg:info --app study-addon-db-app"
  OpenPsql = "heroku pg:psql --app study-addon-db-app"
  ShowConfig = "heroku config:get DATABASE_URL --app study-addon-db-app"
}

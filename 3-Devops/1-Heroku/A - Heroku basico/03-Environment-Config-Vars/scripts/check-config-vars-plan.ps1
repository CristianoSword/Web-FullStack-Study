$ErrorActionPreference = "Stop"

[pscustomobject]@{
  StagingSet = "heroku config:set NODE_ENV=staging API_BASE_URL=https://staging-api.example.com FEATURE_FLAG=true LOG_LEVEL=debug --app study-config-vars-app"
  ProductionSet = "heroku config:set NODE_ENV=production API_BASE_URL=https://api.example.com FEATURE_FLAG=false LOG_LEVEL=warn --app study-config-vars-app"
  ListVars = "heroku config --app study-config-vars-app"
  ReadSingleVar = "heroku config:get API_BASE_URL --app study-config-vars-app"
}

$ErrorActionPreference = "Stop"

[pscustomobject]@{
  CreatePipeline = "heroku pipelines:create study-pipeline --stage staging --app study-pipeline-staging"
  AddProduction = "heroku pipelines:add study-pipeline --stage production --app study-pipeline-production"
  EnableReviewApps = "heroku reviewapps:enable --pipeline study-pipeline"
  Promote = "heroku pipelines:promote --app study-pipeline-staging"
  Releases = "heroku releases --app study-pipeline-staging"
}

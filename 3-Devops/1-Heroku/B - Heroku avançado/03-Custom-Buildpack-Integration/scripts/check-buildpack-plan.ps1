$ErrorActionPreference = "Stop"

[pscustomobject]@{
  SetBuildpack = "heroku buildpacks:set https://example.invalid/buildpacks/wasmtoy --app study-custom-buildpack-app"
  ShowBuildpacks = "heroku buildpacks --app study-custom-buildpack-app"
  DeployApp = "git push heroku main"
  ShowReleases = "heroku releases --app study-custom-buildpack-app"
  Logs = "heroku logs --tail --app study-custom-buildpack-app"
}
